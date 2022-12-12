import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import 'echarts/theme/macarons.js';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
  ]

})
export class IndexModule { }
