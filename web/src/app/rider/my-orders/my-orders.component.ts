import { Component, OnInit } from '@angular/core';
import {MyOrderService} from '../../../service/my-order.service';
import {UserService} from '../../../service/user.service';
import {RiderService} from '../../../service/rider.service';
import {CommonService} from '../../../service/common.service';
import {AlertController} from '@ionic/angular';
import {MyOrder} from '../../../entity/my-order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders = [] as MyOrder[];

  constructor(private myOrderService: MyOrderService,
              private userService: UserService,
              private riderService: RiderService,
              private commonService: CommonService,
              private alertController: AlertController) { }

  ngOnInit(): void {
    this.userService.currentLoginUser$
      .subscribe(user => {
        console.log(user);
        this.riderService.getByUserId(user.id)
          .subscribe( rider => {
            console.log(rider);
            this.myOrderService.getAllByRider(rider.id)
              .subscribe(myOrders => {
                this.myOrders = myOrders;
                console.log(myOrders);
              })
          })
      })
  }

  submit(myOrder: MyOrder) {

  }
}
