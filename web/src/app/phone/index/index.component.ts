import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Page} from '@yunzhi/ng-common';
import {CommonService} from '../../../service/common.service';
import {MyOrder} from '../../../entity/my-order';
import {UserService} from '../../../service/user.service';
import {RestaurantService} from '../../../service/restaurant.service';
import {Restaurant} from '../../../entity/restaurant';


/**
 * 用户管理首页
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    name: 'name',
  };
  currentUserId: number;
  pageData = {} as Page<MyOrder>;
  restaurants = [] as Restaurant[];

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.userService.currentLoginUser$
      .subscribe(user => {
        if (user) {
          this.currentUserId = user.id;
        }
      });
    this.restaurantService.getAll()
      .subscribe(restaurants => {
        this.restaurants = restaurants;
      });
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    // 将参数转换为路由参数
    const queryParams = CommonService.convertToRouteParams(params);
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      }).then();
  }

  onClick(restaurant: Restaurant) {
    this.router.navigate(['phone/buy/' + restaurant.id]);
  }

  comment(id: number) {
    this.router.navigate(['phone/viewComment/' + id]);
  }
}
