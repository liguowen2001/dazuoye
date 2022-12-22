import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ViewCommentComponent } from './view-comment.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [
    ViewCommentComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  providers: [
    DatePipe
  ]
})
export class ViewCommentModule { }
