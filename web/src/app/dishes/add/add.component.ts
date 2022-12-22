import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CommonService} from '../../../service/common.service';
import {Restaurant} from '../../../entity/restaurant';
import {DishesService} from '../../../service/dishes.service';
import {Dishes} from '../../../entity/dishes';
import {RestaurantService} from '../../../service/restaurant.service';
import {UserService} from '../../../service/user.service';
import {FileService} from '../../../service/file.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    price: 'price',
    discount: 'discount',
  };

  formGroup = new FormGroup({});
  teachers = [] as number[];
  file: File;
  sanitizerUrl: any;
  canSubmit = true as boolean;

  constructor(private dishesService: DishesService,
              private commonService: CommonService,
              private restaurantService: RestaurantService,
              private userService: UserService,
              private fileService: FileService,
              private sanitizer: DomSanitizer,) {
  }

  ngOnInit(): void {
    this.inItFormControl();
  }

  /**
   * 初始化formGroup
   */
  inItFormControl() {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.discount, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.price, new FormControl('', Validators.required));
  }

  /**
   * 点击保存
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    let formData = new FormData();
    formData.append('file', this.file);
    this.userService.currentLoginUser$
      .subscribe(user => {
        this.restaurantService.getByUserId(user.id)
          .subscribe(restaurant => {
            this.fileService.save(formData)
              .subscribe(fileName => {
                const newDishes = new Dishes({
                  name: formGroup.get(this.formKeys.name).value,
                  discount: this.formGroup.get(this.formKeys.discount).value,
                  price: this.formGroup.get(this.formKeys.price).value,
                  status: true,
                  restaurant: {id: restaurant.id} as Restaurant,
                  picture: fileName
                });
                // 调用save方法
                this.dishesService.save(newDishes)
                  .subscribe(dishesId => {
                    this.commonService.success(() => {
                      this.commonService.back();
                    });
                  }, () => {
                    this.commonService.error(() => {
                    }, '保存失败', '保存失败');
                  });

              });
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
