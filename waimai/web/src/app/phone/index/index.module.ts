import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index.component';
import {RouterModule} from '@angular/router';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {DevUIModule} from 'ng-devui';
import {TabsModule} from '../tabs/tabs.module';
import {IonicModule} from '@ionic/angular';

/**
 * 用户管理首页
 */

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    YzSizeModule,
    YzPageModule,
    ReactiveFormsModule,
    DevUIModule,
    TabsModule,
    IonicModule,
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
