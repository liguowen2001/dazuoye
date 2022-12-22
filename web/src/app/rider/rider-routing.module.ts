import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TabsComponent} from './tabs/tabs.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {IndexComponent} from './index/index.component';

/**
 * 用户模块路由
 * author: liguwoen
 */
const routs: Routes = [
  {
    path: '',
    component: TabsComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        component: IndexComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'index',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'my-order',
        component: MyOrdersComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class RiderRoutingModule {
}
