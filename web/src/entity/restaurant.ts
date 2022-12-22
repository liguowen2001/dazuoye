/**
 * 饭店
 * author: liguowen
 */
import {User} from './user';

export class Restaurant {
  /**
   * id
   */
  id?: number;

  name?: string;
  /**
   * 用户
   */
  user?: User;

  /**
   * 联系电话
   */
  phone?: string;

  /**
   * 地址
   */
  address?: string;

  praiseRate?: number;

  status?: number;

  drawProportion?: number;

  score?: number;

  commentNumber?: number;

  collectionCode?: string;

  constructor(data = {} as {
    id?: number,
    user?: User,
    phone?: string,
    address?: string,
    praiseRate?: number,
    name?: string,
    status?: number,
    drawProportion?: number,
    score?: number,
    commentNumber?: number
  }) {
    this.id = data.id;
    this.user = data.user;
    this.phone = data.phone;
    this.address = data.address;
    this.praiseRate = data.praiseRate;
    this.name = data.name;
    this.status = data.status;
    this.drawProportion = data.drawProportion;
    this.score = data.score;
    this.commentNumber = data.commentNumber;
  }
}
