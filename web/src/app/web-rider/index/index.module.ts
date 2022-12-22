import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {PipeModule} from '../pipe/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    YzSizeModule,
    PipeModule,
    YzPageModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class IndexModule { }
