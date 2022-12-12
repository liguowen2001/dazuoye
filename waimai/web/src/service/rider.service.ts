import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Rider} from '../entity/rider';
import {MyOrder} from '../entity/my-order';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  private baseUrl = 'rider';

  constructor(private httpClient: HttpClient) {
  }

  public update(riderId: number, rider: Rider): Observable<Rider> {
    return this.httpClient.put<Rider>(`${this.baseUrl}/${riderId}`, rider);
  }

  /**
   * 删除
   */
  public delete(riderId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${riderId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string, status?: number}): Observable<Page<Rider>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('status', isNotNullOrUndefined(param.status) ? param.status : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Rider>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Rider>(data).toObject(o => new Rider(o))));

  }

  public save(rider: Rider): Observable<Rider> {
    return this.httpClient.post<Rider>(`${this.baseUrl}`, rider);
  }

  public getById(riderId: number): Observable<Rider> {
    return this.httpClient.get<Rider>(`${this.baseUrl}/${riderId.toString()}`);
  }

  public getAll(): Observable<Rider[]> {
    return this.httpClient.get<Rider[]>(`${this.baseUrl}/getAll`);
  }

  public getByUserId(userId: number): Observable<Rider> {
    return this.httpClient.get<Rider>(`${this.baseUrl}/getByUser/${userId.toString()}`);
  }

  public assignRider(myOrder: MyOrder): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/assignRider`, myOrder);
  }

}
