import { Component, OnInit } from '@angular/core';
import {MyOrder} from '../../../entity/my-order';
import {MyOrderService} from '../../../service/my-order.service';
import {UserService} from '../../../service/user.service';
import {RiderService} from '../../../service/rider.service';
import {CommonService} from '../../../service/common.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  myOrders = [] as MyOrder[];

  constructor(private myOrderService: MyOrderService,
              private userService: UserService,
              private riderService: RiderService,
              private commonService: CommonService,
              private alertController: AlertController) { }

  ngOnInit(): void {
    this.myOrderService.getAllByStatus(3)
      .subscribe(myOrders => {
        this.myOrders = myOrders;
      } )
  }

  submit(myOrder: MyOrder){
    this.userService.currentLoginUser$
      .subscribe(user => {
        this.riderService.getByUserId(user.id)
          .subscribe( rider => {
            myOrder.status = 4;
            myOrder.rider = rider;
            this.myOrderService.update(myOrder.id,myOrder)
              .subscribe(()=>{
                this.presentAlert();
              })
          })
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '接单成功',
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

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

}
