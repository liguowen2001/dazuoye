import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexModule} from './index/index.module';
import {AdminCensusRoutingModule} from './admin-census-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    AdminCensusRoutingModule
  ]
})
export class AdminCensusModule { }
