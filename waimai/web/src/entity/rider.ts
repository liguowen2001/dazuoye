/**
 * 专业
 * author: liguowen
 */
import {User} from './user';

export class Rider {
  /**
   * id
   */
  id?: number;

  /**
   * 用户
   */
  user?: User;

  status?: number;

  phone?: number;

  constructor(data = {} as {
    id?: number,
    user?: User,
    status?: number,
    phone?: number,

  }) {
    this.id = data.id;
    this.user = data.user;
    this.status = data.status;
    this.phone = data.phone;
  }
}
