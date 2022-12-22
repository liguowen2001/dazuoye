import {MyOrder} from './my-order';

/**
 * 评论
 */
export class Comment {

  id?: number;

  myOrder?: MyOrder;

  restaurantScore?: number;

  restaurantDetail?: string;

  riderScore?: number;

  riderDetail?: string;

  createTime?: number;

  constructor(data = {} as {
    id?: number,
    myOrder?: MyOrder,
    restaurantScore?: number,
    restaurantDetail?: string,
    riderScore?: number,
    riderDetail?: string,
    createTime?: number

  }) {
    this.id = data.id;
    this.myOrder = data.myOrder;
    this.restaurantDetail = data.restaurantDetail;
    this.restaurantScore = data.restaurantScore;
    this.riderScore = data.riderScore;
    this.riderDetail = data.riderDetail;
    this.createTime = data.createTime;
  }
}
