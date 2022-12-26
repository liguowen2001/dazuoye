import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {DishesOrderService} from '../../../service/dishes-order.service';
import {UserService} from '../../../service/user.service';
import {RestaurantService} from '../../../service/restaurant.service';
import {DishesService} from '../../../service/dishes.service';
import {Restaurant} from '../../../entity/restaurant';
import {FormControl, FormGroup} from '@angular/forms';
import * as echarts from 'echarts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  formGroup = new FormGroup({});
  formKeys = {
    startTime: 'startTime',
    endTime: 'endTime'
  };
  week: number;
  today: number;
  xData = [] as string[];
  yData = [] as number[];
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            textStyle: { //数值样式
              color: 'black',
              fontSize: 16
            }
          }
        }
      }
    }]
  };
  restaurantsArray = [] as {
    totalPrice: number;
    restaurant: Restaurant;
  }[];
  oneDay = 86400000;
  totalIncome = 0;
  restaurants = [] as Restaurant[];
  i = 0;

  constructor(private dishesOrderService: DishesOrderService,
              private userService: UserService,
              private restaurantService: RestaurantService,
              private dishesService: DishesService,
              @Inject(LOCALE_ID) private localeId: string,) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.getRestaurant();
    this.formGroup.valueChanges
      .subscribe(value => {
        this.getData(value);
      });
  }

  getRestaurant() {
    this.restaurantService.getAll()
      .subscribe(restaurants => {
        this.restaurants = restaurants;
        this.getData(this.formGroup.value);
      });
  }

  initFormGroup() {
    this.formGroup.addControl(this.formKeys.startTime, new FormControl());
    this.formGroup.addControl(this.formKeys.endTime, new FormControl());
  }

  initChart() {
    var chartDom = document.getElementById('income');
    var myChart = echarts.init(chartDom);

    this.option && myChart.setOption(this.option);
  }

  private getData(value: any) {
    this.totalIncome = 0;
    this.xData = [];
    this.yData = [];
    this.restaurantsArray = [];
    if (value.startTime == null || value.endTime == null) {
      let date = new Date();
      this.week = this.transform(date);
      this.today = new Date(this.getTime(date.getTime())).getTime();
      let endTime = this.today + this.oneDay;
      let startTime = this.today - (this.week - 1) * this.oneDay;
      let i = 0;
      this.getDataByTime(startTime, endTime,i);
    } else {
      let i = 0;
      let startTime = value.startTime;
      let endTime = value.endTime;
      this.getDataByTime(startTime, endTime,i);
    }
  }


  /**
   * 周
   * @param value
   */
  transform(value: any): number {
    if (value !== undefined) {
      let weekArray = new Array(7, 1, 2, 3, 4, 5, 6);
      let myDate = new Date(value);
      let week = weekArray[myDate.getDay()];
      return week;
    } else {
      return -1;
    }
  }

  /**
   * 把时间戳转化为 y-m-r 形式
   * @param timeStamp 时间戳
   */
  getTime(timeStamp: number): string {
    const date = new Date(timeStamp);
    const year = date.getFullYear().toString();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

  }

  private getDataByTime(startTime: number, endTime: number, i) {
    let restaurant = this.restaurants[i];
    this.dishesOrderService.getTotalPriceByRestaurantAndTime(restaurant.id, startTime, endTime)
      .subscribe(value => {
        this.restaurantsArray.push({
          restaurant: restaurant,
          totalPrice: Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))
        });
        i++;
        if (i == this.restaurants.length ) {
          this.sort();
          this.setData();
        } else {
          this.getDataByTime(startTime, endTime, i);
        }
        // if (i == this.restaurants.length - 1) {
        //   this.sort();
        //   this.setData();
        // }
      });
  }

  sort() {
    for (let i = 0; i < this.restaurantsArray.length; i++) {
      for (let j = 0; j < this.restaurantsArray.length - i - 1; j++) {
        if (this.restaurantsArray[j].totalPrice < this.restaurantsArray[j + 1].totalPrice) {
          let a = this.restaurantsArray[j + 1];
          this.restaurantsArray[j + 1] = this.restaurantsArray[j];
          this.restaurantsArray[j] = a;
        }
      }
    }
  }

  setData() {
    for (let i = 0; i < this.restaurantsArray.length; i++) {
      let restaurantsArrayElement = this.restaurantsArray[i];
      this.xData.push(restaurantsArrayElement.restaurant.name);
      this.yData.push(restaurantsArrayElement.totalPrice);
      this.totalIncome += restaurantsArrayElement.restaurant.drawProportion * restaurantsArrayElement.totalPrice / 100;
    }
    this.option.xAxis.data = this.xData;
    this.option.series[0].data = this.yData;
    this.initChart();
  }

}
