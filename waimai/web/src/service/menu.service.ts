import {Injectable} from '@angular/core';
import {Menu} from '../entity/menu';
import {Observable, Subscriber} from 'rxjs';
import {UserService} from './user.service';

/**
 * 菜单服务
 * author: liguowen
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private static readonly menus = [
    {
      name: '用户管理',
      url: 'user',
      icon: 'fa fa-user-cog',
      role: 0
    },
    {
      name: '菜品管理',
      url: 'dishes',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '饭店管理',
      url: 'restaurant',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '订单管理',
      url: 'restaurantOrder',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '骑手管理',
      url: 'rider',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '营收统计',
      url: 'census',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '营收统计',
      url: 'admin-census',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '手机',
      url: 'phone',
      icon: 'fa fa-address-book',
      role: 0
    },
    {
      name: '个人中心',
      url: 'personal',
      icon: 'fa fa-user-alt',
      role: null
    },
  ] as Menu[];

  constructor(private userService: UserService) {
  }

  public getMenus(): Observable<Menu[]> {
    let subscribe: Subscriber<Menu[]>;
    return new Observable<Menu[]>(s => {
      subscribe = s;
      this.userService.currentLoginUser$.subscribe(
        user => {
          subscribe.next(
            MenuService.menus.filter(menu => {
              return true
              /**
               * found 为 true 表示显示此栏菜单，由于目前没有添加user的role属性，默认为全部显示
               */
            })
          );
        }
      );
    });
  }
}
