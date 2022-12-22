import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CartModule { }
