import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {DishesService} from '../../../service/dishes.service';
import {CustomerService} from '../../../service/customer.service';
import {MyOrderService} from '../../../service/my-order.service';
import {DishesOrderService} from '../../../service/dishes-order.service';
import {Customer} from '../../../entity/customer';
import {MyOrder} from '../../../entity/my-order';
import {Dishes} from '../../../entity/dishes';
import {DishesOrder} from '../../../entity/dishesOrder';
import {AlertController, IonButton, IonContent} from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentCustomer: Customer;
  order: MyOrder;
  handlerMessage = '';
  roleMessage = '';
  imgUrl;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private dishesService: DishesService,
              private customerService: CustomerService,
              private orderService: MyOrderService,
              private dishesOrderService: DishesOrderService,
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
              this.orderService.getByCustomerId(customer.id)
                .subscribe(order => {
                  this.order = order;
                  if (order.dishesOrders.length!=0){
                    this.imgUrl = '/images/'+order.dishesOrders[0].dishes.restaurant.collectionCode;
                  }
                });
            });
        }
      });
  }


  /**
   * 加入购物车
   * @param dishes
   */
  inCart(dishes: Dishes) {
    let include = false;
    let newDishesOrder: DishesOrder;
    this.order.dishesOrders.forEach(function (dishesOrder) {
      if (dishesOrder?.dishes?.id == dishes.id) {
        include = true;
        dishesOrder.count++;
        newDishesOrder = dishesOrder;
        return;
      }
    });
    if (include) {
      this.dishesOrderService.update(newDishesOrder.id, newDishesOrder)
        .subscribe(value => {
        });
    } else {
      const dishesOrder = {
        dishes: {
          id: dishes.id
        } as Dishes,
        count: 1,
        price: dishes.price * dishes.discount / 10,
      } as DishesOrder;
      this.dishesOrderService.save(dishesOrder)
        .subscribe(dishesOrder => {
          this.order.dishesOrders.push(dishesOrder);
          this.orderService.update(this.order.id, this.order)
            .subscribe(() => {
            });
        });
    }
  }

  /**
   * 移出购物车
   * @param dishes
   */
  outCart(dishes: Dishes) {
    let include = false;
    let newDishesOrder: DishesOrder;
    this.order.dishesOrders.forEach(function (dishesOrder) {
      if (dishesOrder?.dishes?.id == dishes.id) {
        include = true;
        dishesOrder.count--;
        newDishesOrder = dishesOrder;
        return;
      }
    });
    if (include) {
      if (newDishesOrder.count == 0) {
        let index = this.order.dishesOrders.indexOf(newDishesOrder);
        this.order.dishesOrders.splice(index, 1);
        this.orderService.update(this.order.id, this.order)
          .subscribe(() => {
            this.dishesOrderService.delete(newDishesOrder.id)
              .subscribe(() => {
                this.router.navigate(['/phone/cart']);
              });
          });

      }
      this.dishesOrderService.update(newDishesOrder.id, newDishesOrder)
        .subscribe(value => {
        });
    }
  }


  pay() {
    let totalPrice = 0;
    this.order.dishesOrders.forEach(function (dishesOrder){
      totalPrice+=dishesOrder.price*dishesOrder.count;
    })
    this.order.totalPrice = totalPrice;
    this.order.status = 1;
    this.presentAlert()
      .then(()=>{
        if (this.handlerMessage == 'yes')
        this.orderService.update(this.order.id, this.order)
          .subscribe(order => {
            console.log('支付成功');
          });
      })

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '请扫码支付',
      message: `<img src="${this.imgUrl}" alt="g-maps" style="border-radius: 2px">`,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'no';
          },
        },
        {
          text: '确定',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'yes';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
