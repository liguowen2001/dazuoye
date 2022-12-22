import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexModule} from './index/index.module';
import {CensusRoutingModule} from './census-routing.module';
import {RestaurantModule} from './restaurant/restaurant.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    CensusRoutingModule,
    RestaurantModule
  ]
})
export class CensusModule { }
