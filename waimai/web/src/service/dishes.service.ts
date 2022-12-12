import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Dishes} from '../entity/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  private baseUrl = 'dishes';

  constructor(private httpClient: HttpClient) {
  }

  public update(dishesId: number, dishes: Dishes): Observable<Dishes> {
    return this.httpClient.put<Dishes>(`${this.baseUrl}/${dishesId}`, dishes);
  }

  /**
   * 删除
   */
  public delete(dishesId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${dishesId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string, restaurantId?: number}): Observable<Page<Dishes>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('restaurantId', isNotNullOrUndefined(param.restaurantId) ? param.restaurantId : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Dishes>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Dishes>(data).toObject(o => new Dishes(o))));

  }

  public save(dishes: Dishes): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, dishes);
  }

  public getById(dishesId: number): Observable<Dishes> {
    return this.httpClient.get<Dishes>(`${this.baseUrl}/${dishesId.toString()}`);
  }

  public getAll(): Observable<Dishes[]> {
    return this.httpClient.get<Dishes[]>(`${this.baseUrl}/getAll`);
  }

  public getByRestaurantId(restaurantId: number): Observable<Dishes[]> {
    return this.httpClient.get<Dishes[]>(`${this.baseUrl}/getByRestaurant/${restaurantId.toString()}`);
  }

}
