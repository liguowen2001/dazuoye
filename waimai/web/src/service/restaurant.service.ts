import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Restaurant} from '../entity/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'restaurant';

  constructor(private httpClient: HttpClient) {
  }

  public update(restaurantId: number, restaurant: Restaurant): Observable<Restaurant> {
    return this.httpClient.put<Restaurant>(`${this.baseUrl}/${restaurantId}`, restaurant);
  }

  /**
   * 删除
   */
  public delete(restaurantId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${restaurantId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string,userName?: string}): Observable<Page<Restaurant>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('username', isNotNullOrUndefined(param.userName) ? param.userName : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Restaurant>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Restaurant>(data).toObject(o => new Restaurant(o))));

  }

  public save(restaurant: Restaurant): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, restaurant);
  }

  public getById(restaurantId: number): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${this.baseUrl}/${restaurantId.toString()}`);
  }

  public getAll(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${this.baseUrl}/getAll`);
  }

  public getByUserId(userId: number): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${this.baseUrl}/getByUser/${userId.toString()}`);
  }

}
