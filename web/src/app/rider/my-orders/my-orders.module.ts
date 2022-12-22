import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class MyOrdersModule { }
