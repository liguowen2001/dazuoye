import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BasicModule} from '@yunzhi/ng-theme';
import {ThemeService} from '../service/theme.service';
import {ApiProModule} from "../api/api.pro.module";
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BasicModule.forRoot({
      basicService: ThemeService
    }),
     //ApiDemoModule
    IonicModule,
    ApiProModule,
    IonicModule.forRoot(),
    BrowserModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
