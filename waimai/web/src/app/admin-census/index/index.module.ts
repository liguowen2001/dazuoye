import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../census/date/date.module';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateModule
  ]
})
export class IndexModule { }
