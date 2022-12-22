import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderComponent } from './rider.component';
import {RiderRoutingModule} from './rider-routing.module';
import {TabsModule} from './tabs/tabs.module';
import {MyOrdersModule} from './my-orders/my-orders.module';
import {IndexModule} from './index/index.module';



@NgModule({
  declarations: [
    RiderComponent
  ],
  imports: [
    CommonModule,
    RiderRoutingModule,
    TabsModule,
    MyOrdersModule,
    IndexModule
  ]
})
export class RiderModule { }
