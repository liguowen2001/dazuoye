/**
 * 用户
 * author: liMingAo
 */
export class User {
  /**
   * 用户id
   */
  id?: number;
  /**
   * 用户姓名
   */
  name?: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password?: string;

  role?: number;

  pictureName?: string;

  constructor(data = {} as {
    id?: number,
    name?: string,
    username: string,
    password?: string,
    role?: number,
    pictureName?: string

  }) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.pictureName = data.pictureName;
    this.role = data.role;
  }
}
