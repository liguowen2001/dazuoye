import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {NgModule} from '@angular/core';
import {RestaurantComponent} from './restaurant/restaurant.component';

/**
 * 用户模块路由
 * author: liguwoen
 */
const routs: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    data: {
      title: ''
    }
  },
  // {
  //   path: 'add',
  //   component: AddComponent,
  //   data: {
  //     title: '新增'
  //   }
  // },
  // {
  //   path: 'edit/:id',
  //   component: EditComponent,
  //   data: {
  //     title: '修改'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class CensusRoutingModule {
}
