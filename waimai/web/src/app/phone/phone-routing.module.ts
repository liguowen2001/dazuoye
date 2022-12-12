import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {NgModule} from '@angular/core';
import {TabsComponent} from './tabs/tabs.component';
import {BuyComponent} from './buy/buy.component';
import {CartComponent} from './cart/cart.component';
import {OrderComponent} from './order/order.component';
import {CommentComponent} from './comment/comment.component';

/**
 * 用户模块路由
 * author: liguwoen
 */
const routs: Routes = [
  {
    path: '',
    component: TabsComponent,
    children:[
      {
        path: '',
        component: IndexComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          title: '新增'
        }
      },
      {
        path: 'cart',
        component: CartComponent,
        data: {
          title: '购物车'
        }
      },
      {
        path: 'order',
        component: OrderComponent,
        data: {
          title: '购物车'
        }
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: '修改'
        }
      },
      {
        path: 'comment/:id',
        component: CommentComponent,
        data: {
          title: '评价'
        }
      },
      {
        path: 'index',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'buy/:id',
        component: BuyComponent,
        data: {
          title: '选购'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class PhoneRoutingModule {
}
