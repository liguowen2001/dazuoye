import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {YzSubmitButtonModule} from '@yunzhi/ng-common';
import {RouterModule} from '@angular/router';

/**
 * 登录
 */

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzSubmitButtonModule,
    RouterModule
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule { }
