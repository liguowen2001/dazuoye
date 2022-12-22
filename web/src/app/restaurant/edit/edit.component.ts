import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {Assert} from '@yunzhi/utils/build/src';
import {RestaurantService} from '../../../service/restaurant.service';
import {Restaurant} from '../../../entity/restaurant';


/**
 * 用户管理编辑
 * author: liMingAo
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private restaurantService: RestaurantService) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    drawProportion: 'drawProportion'
  };
  restaurant = {} as Restaurant;

  loadById(id: number): void {
    this.restaurantService.getById(id)
      .subscribe((restaurant: Restaurant) => {
        this.setRestaurant(restaurant);
      }, (error: any) => console.log(error));
  }

  setRestaurant(restaurant: Restaurant): void {
    this.restaurant = restaurant;
    this.formGroup.get(this.formKeys.drawProportion).setValue(restaurant.drawProportion);
  }

  initFormControl(): void {
    this.formGroup.addControl(this.formKeys.drawProportion, new FormControl('', Validators.required));
  }

  ngOnInit(): void {
    this.initFormControl();
    // 检测用户名变化，判断是否改变
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  onSubmit(formGroup: FormGroup): void {
    this.restaurant.drawProportion = this.formGroup.get(this.formKeys.drawProportion).value;
    this.restaurantService.update(this.restaurant.id, this.restaurant)
      .subscribe(value => {
        console.log(value);
        this.commonService.success(() => this.commonService.back());
      }, (error) => {
        this.commonService.error(() => {
        }, error);
      });
  }
}
