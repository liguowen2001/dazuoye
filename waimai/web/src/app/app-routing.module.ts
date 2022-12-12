import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasicComponent} from '@yunzhi/ng-theme';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'phone',
    loadChildren: () => import('./phone/phone.module').then(m => m.PhoneModule),
  },
  {
    path: '',
    component: BasicComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          title: '用户管理'
        }
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
        data: {
          title: '饭店管理'
        }
      },
      {
        path: 'rider',
        loadChildren: () => import('./rider/rider.module').then(m => m.RiderModule),
        data: {
          title: '骑手管理'
        }
      },
      {
        path: 'census',
        loadChildren: () => import('./census/census.module').then(m => m.CensusModule),
        data: {
          title: '统计'
        }
      },
      {
        path: 'admin-census',
        loadChildren: () => import('./admin-census/admin-census.module').then(m => m.AdminCensusModule),
        data: {
          title: '统计'
        }
      },
      {
        path: 'dishes',
        loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule),
        data: {
          title: '菜品管理'
        }
      },
      {
        path: 'restaurantOrder',
        loadChildren: () => import('./restaurant-order/restaurant-order.module').then(m => m.RestaurantOrderModule),
        data: {
          title: '饭店管理'
        }
      },
      {
        path: 'personal',
        loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
