import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhoneRoutingModule} from './phone-routing.module';
import {IndexModule} from './index/index.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';
import {TabsModule} from './tabs/tabs.module';
import {BuyModule} from './buy/buy.module';
import {OrderModule} from './order/order.module';
import {CartModule} from './cart/cart.module';
import {CommentModule} from './comment/comment.module';
import {ViewCommentComponent} from './view-comment/view-comment.component';
import {ViewCommentModule} from './view-comment/view-comment.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PhoneRoutingModule,
    IndexModule,
    AddModule,
    EditModule,
    TabsModule,
    BuyModule,
    OrderModule,
    CartModule,
    CommentModule,
    ViewCommentModule
  ]
})
export class PhoneModule { }
