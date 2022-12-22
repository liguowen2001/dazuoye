import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../date/date.module';



@NgModule({
  declarations: [
    RestaurantComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateModule
  ]
})
export class RestaurantModule { }
