import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Restaurant} from '../../../entity/restaurant';
import {DishesOrderService} from '../../../service/dishes-order.service';
import {UserService} from '../../../service/user.service';
import {RestaurantService} from '../../../service/restaurant.service';
import * as echarts from 'echarts';
import {Dishes} from '../../../entity/dishes';
import {DishesService} from '../../../service/dishes.service';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurant = {} as Restaurant;

  formGroup = new FormGroup({});

  oneDay = 86400000;

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

  dishesOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',

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
          color: '#efe66a',
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

  week: number;
  today: number;
  xData = [] as string[];
  yData = [] as number[];
  dishesXData = [] as string[];
  dishesYData = [] as number[];
  dishesArray = [] as {
    count: number;
    dishes: Dishes;
  }[];
  dishes = [] as Dishes[];

  endTime = new FormControl();
  formKeys = {
    startTime: 'startTime',
    endTime: 'endTime'
  };

  constructor(private dishesOrderService: DishesOrderService,
              private userService: UserService,
              private restaurantService: RestaurantService,
              private dishesService: DishesService,
              @Inject(LOCALE_ID) private localeId: string,
  ) {
  }

  ngOnInit(): void {
    this.initTime();
    this.initFormGroup();
    this.getRestaurant();
    this.formGroup.valueChanges
      .subscribe(value => {
        this.getDate(value);
        this.getDishesData(value);
      });
    this.initDishesChart();
  }

  getRestaurant() {
    this.userService.currentLoginUser$
      .subscribe(user => {
        this.restaurantService.getByUserId(user.id)
          .subscribe(restaurant => {
            this.restaurant = restaurant;
            this.getDishes();
          });
      });
  }

  initFormGroup() {
    this.formGroup.addControl(this.formKeys.startTime, new FormControl());
    this.formGroup.addControl(this.formKeys.endTime, new FormControl());
  }

  /**
   * 初始化收入统计
   */
  initChart() {
    var chartDom = document.getElementById('income');
    var myChart = echarts.init(chartDom);

    this.option && myChart.setOption(this.option);
  }

  /**
   * 初始化销量统计
   */
  initDishesChart() {
    var chartDom = document.getElementById('dishes');
    var myChart = echarts.init(chartDom);

    this.dishesOption && myChart.setOption(this.dishesOption);
  }

  /**
   * 获得时间
   */
  initTime() {
    let date = new Date();
    this.week = this.transform(date);
    this.today = new Date(this.getTime(date.getTime())).getTime();
  }

  getDate(value) {
    this.xData = [];
    this.yData = [];
    if (value.startTime == null || value.endTime == null) {
      this.getYDateByWeek(this.week);
    } else {
      let startTime = value.startTime;
      let endTime = value.endTime;
      this.getYDateByTime(startTime, endTime);
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

  /**
   * 获取本周数据
   */
  getYDateByWeek(week: number) {
    this.dishesOrderService.getTotalPriceByRestaurantAndTime(
      this.restaurant.id,
      this.today - week * this.oneDay + this.oneDay,
      this.today - week * this.oneDay + this.oneDay * 2)
      .subscribe(value => {
        week--;
        this.yData.push(Number(value.toString().match(/^\d+(?:\.\d{0,2})?/)));
        if (week == 0) {
          this.setXData();
          this.option.series[0].data = this.yData;
          this.option.xAxis.data = this.xData;
          this.initChart();
        } else {
          this.getYDateByWeek(week);
        }
      });
  }

  setXData(){
    for (let i = 0; i < this.week; i++) {
      switch (i) {
        case 0:
          this.xData.push('周一');
          break;
        case 1:
          this.xData.push('周二');
          break;
        case 2:
          this.xData.push('周三');
          break;
        case 3:
          this.xData.push('周四');
          break;
        case 4:
          this.xData.push('周五');
          break;
        case 5:
          this.xData.push('周六');
          break;
        case 6:
          this.xData.push('周日');
          break;
      }
    }
  }
  /**
   * 递归获得每一天的数据
   * @param startTime
   * @param endTime
   */
  getYDateByTime(startTime: number, endTime: number) {
    if (startTime <= endTime) {
      this.dishesOrderService.getTotalPriceByRestaurantAndTime(this.restaurant.id, startTime, startTime + this.oneDay)
        .subscribe(value => {
          this.xData.push(this.getTime(startTime));
          this.yData.push(Number(value.toString().match(/^\d+(?:\.\d{0,2})?/)));
          startTime += this.oneDay;
          if (startTime <= endTime) {
            this.getYDateByTime(startTime, endTime);
          } else {
            this.option.xAxis.data = this.xData;
            this.option.series[0].data = this.yData;
            this.initChart();
          }
        });
    } else {
      return;
    }
  }

  getDishes() {
    this.dishesService.getByRestaurantId(this.restaurant.id)
      .subscribe(dishes => {
        this.dishes = dishes;
        this.getDate(this.formGroup.value);
        this.getDishesData(this.formGroup.value);
      });
  }

  getDishesData(value: any) {
    this.dishesArray = [];
    this.dishesXData = [];
    this.dishesYData = [];
    let i = 0;
    if (value.startTime == null || value.endTime == null) {
      this.initTime();
      let endTime = this.today + this.oneDay;
      let startTime = this.today - (this.week - 1) * this.oneDay;
      this.getDishesArray(startTime, endTime,i);
    } else {
      this.getDishesArray(value.startTime, value.endTime + this.oneDay,i);
    }
  }

  getDishesArray(startTime: number, endTime: number, i: number) {
      let dishes = this.dishes[i];
      this.dishesOrderService.getCountByDishesAndTime(dishes.id, startTime, endTime)
        .subscribe(value => {
          i++;
          this.dishesArray.push({
            dishes: dishes,
            count: value
          });
          if (i == this.dishes.length ) {
            this.sort();
            this.setDishesData();
          }else {
            this.getDishesArray(startTime,endTime,i);
          }
        });
  }

  sort() {
    for (let i = 0; i < this.dishesArray.length; i++) {
      for (let j = 0; j < this.dishesArray.length - i - 1; j++) {
        if (this.dishesArray[j].count < this.dishesArray[j + 1].count) {
          let a = this.dishesArray[j + 1];
          this.dishesArray[j + 1] = this.dishesArray[j];
          this.dishesArray[j] = a;
        }
      }
    }
  }

  setDishesData() {
    for (let i = 0; i < this.dishesArray.length; i++) {
      let dishesArrayElement = this.dishesArray[i];
      this.dishesXData.push(dishesArrayElement.dishes.name);
      this.dishesYData.push(dishesArrayElement.count);
    }
    this.dishesOption.xAxis.data = this.dishesXData;
    this.dishesOption.series[0].data = this.dishesYData;
    this.initDishesChart();
  }
}
