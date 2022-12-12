/**
 * 专业
 * author: liguowen
 */
import {Restaurant} from './restaurant';
import {Dishes} from './dishes';

export class DishesOrder {
  /**
   * id
   */
  id?: number;

  dishes?: Dishes;

  count?: number;

  createTime?: number;

  price?: number;

  constructor(data = {} as {
    id?: number,
    dishes?: Dishes,
    count?: number,
    createTime?: number,
    price?: number
  }) {
    this.id = data.id;
    this.dishes = data.dishes;
    this.count = data.count;
    this.createTime = data.createTime;
    this.price = data.price;
  }
}
