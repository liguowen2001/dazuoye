import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import {IonicModule} from '@ionic/angular';
import {PipeModule} from '../../restaurant-order/pipe/pipe.module';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipeModule
  ]
})
export class OrderModule { }
