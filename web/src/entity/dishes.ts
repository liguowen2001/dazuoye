/**
 * 专业
 * author: liguowen
 */
import {Restaurant} from './restaurant';

export class Dishes {
  /**
   * id
   */
  id?: number;

  name?: string;

  picture?: string;

  restaurant ?: Restaurant;

  price?: number;

  discount?: number;

  status?: boolean;


  constructor(data = {} as {
    id?: number,
    name?: string,
    picture?: string,
    restaurant?: Restaurant,
    price?: number,
    discount?: number,
    status?: boolean
  }) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.restaurant = data.restaurant;
    this.picture = data.picture;
    this.discount = data.discount;
    this.status = data.status;
  }
}
