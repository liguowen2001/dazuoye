import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {CustomerService} from '../../../service/customer.service';
import {MyOrderService} from '../../../service/my-order.service';
import {CommentService} from '../../../service/comment.service';
import {Customer} from '../../../entity/customer';
import {MyOrder} from '../../../entity/my-order';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private currentCustomer: Customer;
  myOrders = [] as MyOrder[];
  handlerMessage = '';
  roleMessage = '';

  constructor(private userService: UserService,
              private customerService: CustomerService,
              private myOrderService: MyOrderService,
              private commentService: CommentService,
              private router: Router,
              private alertController: AlertController) {
  }

  ngOnInit(): void {
    this.getCurrentCustomer();
  }

  private getCurrentCustomer() {
    this.userService.currentLoginUser$
      .subscribe(user => {
        if (user) {
          this.customerService.getByUserId(user.id)
            .subscribe(customer => {
              this.currentCustomer = customer;
              this.myOrderService.getAllByCustomerId(customer.id)
                .subscribe(myOrders => {
                  this.myOrders = myOrders;
                  this.myOrders.forEach(function (myOrder) {
                    let totalPrice = 0;
                    myOrder.dishesOrders.forEach(function (dishesOrder) {
                      totalPrice += dishesOrder.price * dishesOrder.count;
                    });
                    myOrder.totalPrice = totalPrice;
                  });
                });
            }, error => {
              console.log('no customer');
            });
        }
      });
  }

  /**
   * 确认收货
   */
  confirm(myOrder: MyOrder) {
    myOrder.status = 5;
    this.myOrderService.update(myOrder.id,myOrder)
      .subscribe(() => {
        this.presentAlert();
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '收货成功，快去评价吧',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: '确定',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  comment(myOrder: MyOrder) {
    this.router.navigate(['phone/comment/' + myOrder.id]);
  }
}
