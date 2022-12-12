/**
 * 专业
 * author: liguowen
 */
import {User} from './user';

export class Customer {
  /**
   * id
   */
  id?: number;

  /**
   * 用户
   */
  user?: User;

  address?: string

  constructor(data = {} as {
    id?: number,
    user?: User,
    address?: string
  }) {
    this.id = data.id;
    this.user = data.user;
    this.address = data.address;
  }
}
