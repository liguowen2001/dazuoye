import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Dishes} from '../entity/dishes';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private alertController: AlertController) {
  }

  public async presentAlert(callback?: () => void, header?: string) {
    const alert = await this.alertController.create({
      header: header,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: '确定',
          role: 'confirm',
          handler: () => {
            if (callback) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
  }
}
