import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import {DishesOrderService} from '../../../service/dishes-order.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  title = 'myapp';

  constructor(private dishesOrderService: DishesOrderService) {
  }
  ngOnInit() {
    this.initChart()
    let date = new Date();
    this.dishesOrderService.getTotalPriceByRestaurantAndTime(3,123456,date.getTime())
      .subscribe(value => {
        console.log(value);
      })
    console.log(date.getTime());
  }
  initChart() {
    var chartDom = document.getElementById('testchart');
    var myChart = echarts.init(chartDom);
    var option;
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
        }
      }]
    };
    option && myChart.setOption(option);
  }
}
