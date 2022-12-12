import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {map} from 'rxjs/operators';
import {DishesOrder} from '../entity/dishesOrder';

@Injectable({
  providedIn: 'root'
})
export class DishesOrderService {

  private baseUrl = 'dishesOrder';

  constructor(private httpClient: HttpClient) {
  }

  public update(dishesOrderId: number, dishesOrder: DishesOrder): Observable<DishesOrder> {
    return this.httpClient.put<DishesOrder>(`${this.baseUrl}/${dishesOrderId}`, dishesOrder);
  }

  /**
   * 删除
   */
  public delete(dishesOrderId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${dishesOrderId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string, userName?: string}): Observable<Page<DishesOrder>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<DishesOrder>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<DishesOrder>(data).toObject(o => new DishesOrder(o))));

  }

  public save(dishesOrder: DishesOrder): Observable<DishesOrder> {
    return this.httpClient.post<DishesOrder>(`${this.baseUrl}`, dishesOrder);
  }

  public getById(dishesOrderId: number): Observable<DishesOrder> {
    return this.httpClient.get<DishesOrder>(`${this.baseUrl}/${dishesOrderId.toString()}`);
  }

  public getAll(): Observable<DishesOrder[]> {
    return this.httpClient.get<DishesOrder[]>(`${this.baseUrl}/getAll`);
  }

  public getTotalPriceByRestaurantAndTime(restaurantId: number, startTime: number, endTime: number): Observable<number> {
    const httpParams = new HttpParams()
      .append('restaurantId', restaurantId.toString())
      .append('startTime', startTime.toString())
      .append('endTime', endTime.toString());
    return this.httpClient.get<number>(`${this.baseUrl}/getTotalPriceByRestaurantAndTime`, {params: httpParams});
  }

  public getCountByDishesAndTime(dishesId: number, startTime: number, endTime: number): Observable<number> {
    const httpParams = new HttpParams()
      .append('dishesId', dishesId.toString())
      .append('startTime', startTime.toString())
      .append('endTime', endTime.toString());
    return this.httpClient.get<number>(`${this.baseUrl}/getCountByDishesAndTime`, {params: httpParams});
  }

}
