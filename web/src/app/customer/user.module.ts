import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';
import {IndexModule} from './index/index.module';
import { RolePipe } from './pipe/role.pipe';

/**
 * 用户管理
 */

@NgModule({
  declarations: [

  ],
  exports: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IndexModule,
    EditModule,
    AddModule
  ]
})
export class UserModule {
}
