import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RolePipe} from './role.pipe';



@NgModule({
  declarations: [RolePipe],
  imports: [
    CommonModule,
  ],
  exports: [
    RolePipe
  ]
})
export class PipeModule { }
