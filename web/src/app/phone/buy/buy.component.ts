import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {DishesService} from '../../../service/dishes.service';
import {Dishes} from '../../../entity/dishes';
import {Assert} from '@yunzhi/utils';
import {ActivatedRoute} from '@angular/router';
import {Customer} from '../../../entity/customer';
import {CustomerService} from '../../../service/customer.service';
import {MyOrder} from '../../../entity/my-order';
import {MyOrderService} from '../../../service/my-order.service';
import {DishesOrderService} from '../../../service/dishes-order.service';
import {DishesOrder} from '../../../entity/dishesOrder';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  dishes: Dishes[];
  currentCustomer: Customer;
  order: MyOrder;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private dishesService: DishesService,
              private customerService: CustomerService,
              private orderService: MyOrderService,
              private dishesOrderService: DishesOrderService) {
  }

  ngOnInit(): void {
    this.getDishes();
    this.getCurrentCustomer();

  }

  private getDishes() {
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.dishesService.getByRestaurantId(id)
        .subscribe(dishes => {
          this.dishes = dishes;
        });
    });
  }

  private getCurrentCustomer() {
    this.userService.currentLoginUser$
      .subscribe(user => {
        if (user) {
          this.customerService.getByUserId(user.id)
            .subscribe(customer => {
              this.currentCustomer = customer;
              this.getOrder(customer);
            }, error => {
              console.log('no customer');
            });
        }
      });
  }

  private getOrder(customer: Customer) {
    this.orderService.getByCustomerId(customer.id)
      .subscribe(order => {
        this.order = order;
        if (order == null) {
          let order = {
            customer: customer,
            status: 0
          };
          this.orderService.save(order)
            .subscribe(order => {
              this.order = order;
            });
        }
      }, error => {
        console.log('not found order');
      });
  }


  /**
   * 加入购物车
   * @param dishes
   */
  inCart(dishes: Dishes) {
    let include = false;
    let newDishesOrder: DishesOrder;
    this.order.dishesOrders?.forEach(function (dishesOrder) {
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
          id: dishes.id,
          restaurant: {
            id: dishes.restaurant.id
          }
        } as Dishes,
        count: 1,
        price: dishes.price * dishes.discount / 10,
      } as DishesOrder;
      this.dishesOrderService.save(dishesOrder)
        .subscribe(dishesOrder => {
          if (this.order.dishesOrders == null || this.order.dishesOrders == undefined) {
            this.order.dishesOrders = [] as DishesOrder[];
          }
          this.order.dishesOrders.push(dishesOrder);
          this.order.restaurant = dishesOrder.dishes.restaurant;
          this.orderService.update(this.order.id, this.order)
            .subscribe(order => {
              console.log(order);
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
    this.order.dishesOrders?.forEach(function (dishesOrder) {
      if (dishesOrder?.dishes?.id == dishes.id) {
        include = true;
        dishesOrder.count--;
        newDishesOrder = dishesOrder;
        return;
      }
    });
    if (include) {
      console.log('include');
      if (newDishesOrder.count == 0) {
        let index = this.order.dishesOrders.indexOf(newDishesOrder);
        this.order.dishesOrders.splice(index, 1);
        this.orderService.update(this.order.id, this.order)
          .subscribe(() => {
            this.dishesOrderService.delete(newDishesOrder.id)
              .subscribe(() => {
              });
          });

      }
      this.dishesOrderService.update(newDishesOrder.id, newDishesOrder)
        .subscribe(value => {
        });
    }
  }
}
