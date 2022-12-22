import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {Assert} from '@yunzhi/utils/build/src';
import {RestaurantService} from '../../../service/restaurant.service';
import {UserService} from '../../../service/user.service';
import {MyOrderService} from '../../../service/my-order.service';
import {MyOrder} from '../../../entity/my-order';
import {Rider} from '../../../entity/rider';
import {RiderService} from '../../../service/rider.service';


@Component({
  selector: 'app-category-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    status: 'status',
    restaurantId: 'restaurantId'
  };

  pageData = {} as Page<MyOrder>;
  params: Params;
  queryForm = new FormGroup({});

  constructor(private orderService: MyOrderService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private restaurantService: RestaurantService,
              private userService: UserService,
              private riderService: RiderService) {
  }

  ngOnInit(): void {
    this.queryForm!.addControl(this.keys.status, new FormControl());
    this.queryForm!.addControl(this.keys.restaurantId, new FormControl());

    // 订阅参数变化
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.status).setValue(params[this.keys.status]);
      this.queryForm.get(this.keys.restaurantId).setValue(params[this.keys.restaurantId]);

      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.userService.currentLoginUser$
        .subscribe(user => {
          this.restaurantService.getByUserId(user.id)
            .subscribe(restaurant => {
              // 使用this.keys初始化FormControl，从而避免拼写错误
              this.orderService.page(
                // 调用stringToIntegerNumber将查询的字符串转为number
                getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
                getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
                {
                  status: params[this.keys.status],
                  restaurantId: restaurant.id,
                },
              ).subscribe(page => {
                this.pageData = page;
              });
            });
        });
    });
  }


  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }


  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    //this.commonService.reloadByParam(params).then();
    // 将参数转换为路由参数
    const queryParams = CommonService.convertToRouteParams(params);
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      }).then();
  }

  statusChange(myOrder: MyOrder) {
    if (myOrder.status == 1) {
      myOrder.status = 2;
      this.orderService.update(myOrder.id, myOrder)
        .subscribe(() => {
          this.commonService.success(() => {
          }, '', '接单成功');
        });
    } else {
      myOrder.status = 3;
      this.orderService.update(myOrder.id, myOrder)
        .subscribe(() => {
          this.riderService.assignRider(myOrder)
            .subscribe(value => {
              console.log(value);
            })
          this.commonService.success(() => {
          }, '', '出单成功');
        });
    }
  }

}
