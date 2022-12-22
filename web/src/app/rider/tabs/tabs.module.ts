import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    TabsComponent
  ],
  exports: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class TabsModule { }
