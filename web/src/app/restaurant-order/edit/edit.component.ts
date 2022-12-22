import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils/build/src';
import {DishesService} from '../../../service/dishes.service';
import {Dishes} from '../../../entity/dishes';
import {FileService} from '../../../service/file.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dishesService: DishesService,
              private commonService: CommonService,
              private fileService: FileService,
              private sanitizer: DomSanitizer,) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id:'id',
    name: 'name',
    price: 'price',
    discount: 'discount',
  };
  dishes = {} as Dishes;
  file: File;
  sanitizerUrl: any;
  canSubmit = true as boolean;

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.price, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.discount, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.id,new FormControl());
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.dishesService.getById(id)
      .subscribe((dishes) => {
        this.dishes = dishes;
        Assert.isNotNullOrUndefined(dishes, dishes.name, 'some properties must be passed');
        this.formGroup.get(this.formKeys.name).setValue(dishes.name);
        this.formGroup.get(this.formKeys.price).setValue(dishes.price);
        this.formGroup.get(this.formKeys.discount).setValue(dishes.discount);

      }, error => console.log(error));
  }

  onSubmit(formGroup: FormGroup): void {
    const newDishes = new Dishes({
      name: this.formGroup.get(this.formKeys.name).value,
      price: this.formGroup.get(this.formKeys.price).value,
      discount: this.formGroup.get(this.formKeys.discount).value,
      status: this.dishes.status,
      picture: this.dishes.picture
    });

    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('fileName', this.dishes.picture);
    this.fileService.update(formData)
      .subscribe(() => {
        this.dishesService.update(this.dishes.id, newDishes)
          .subscribe(() => {
              this.commonService.success(() => this.commonService.back());
            },
            error => {
              this.commonService.error();
            });
      });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.canSubmit = false;
      this.file = file;
      let imgUrl = window.URL.createObjectURL(file);
      this.sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    }
  }
}
