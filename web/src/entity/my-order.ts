import {Customer} from './customer';
import {DishesOrder} from './dishesOrder';
import {Restaurant} from './restaurant';
import {Rider} from './rider';

export class MyOrder {

  id?: number;

  customer?: Customer;

  dishesOrders?: DishesOrder[];

  totalPrice?: number;

  status?: number;

  restaurant?: Restaurant;

  rider?: Rider;

  createTime?: number;


  constructor(data = {} as {
    id?: number,
    customer?: Customer,
    dishesOrders?: DishesOrder[],
    totalPrice?: number,
    status?: number,
    restaurant?: Restaurant,
    rider?: Rider,
    createTime?: number
  }) {
    this.id = data.id;
    this.customer = data.customer;
    this.dishesOrders = data.dishesOrders;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
    this.restaurant = data.restaurant;
    this.rider = data.rider;
    this.createTime = data.createTime;
  }
}
