import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {MyOrder} from '../entity/my-order';

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {

  private baseUrl = 'order';

  constructor(private httpClient: HttpClient) {
  }

  public update(orderId: number, order: MyOrder): Observable<MyOrder> {
    return this.httpClient.put<MyOrder>(`${this.baseUrl}/${orderId}`, order);
  }

  /**
   * 删除
   */
  public delete(orderId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${orderId.toString()}`);
  }


  public page(page: number, size: number, param: {status?: number, restaurantId?: number}): Observable<Page<MyOrder>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('status', isNotNullOrUndefined(param.status) ? param.status : '')
      .append('restaurantId', isNotNullOrUndefined(param.restaurantId) ? param.restaurantId : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<MyOrder>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<MyOrder>(data).toObject(o => new MyOrder(o))));

  }

  public save(order: MyOrder): Observable<MyOrder> {
    return this.httpClient.post<MyOrder>(`${this.baseUrl}`, order);
  }

  public getById(orderId: number): Observable<MyOrder> {
    return this.httpClient.get<MyOrder>(`${this.baseUrl}/${orderId.toString()}`);
  }

  public getAll(): Observable<MyOrder[]> {
    return this.httpClient.get<MyOrder[]>(`${this.baseUrl}/getAll`);
  }

  public getByCustomerId(customerId: number): Observable<MyOrder> {
    return this.httpClient.get<MyOrder>(`${this.baseUrl}/getByCustomer/${customerId.toString()}`);
  }

  public getAllByCustomerId(customerId: number): Observable<MyOrder[]> {
    return this.httpClient.get<MyOrder[]>(`${this.baseUrl}/getAllByCustomer/${customerId.toString()}`);
  }

}
