import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginRoutingModule} from './login-routing.module';
import {SignInModule} from './sign-in/sign-in.module';
import {SignUpModule} from './sign-up/sign-up.module';

/**
 * 登录页面
 * @author weiweiyi
 */

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule,
    SignInModule,
    SignUpModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule { }
