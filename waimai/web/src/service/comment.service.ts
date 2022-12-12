import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Comment} from '../entity/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'comment';

  constructor(private httpClient: HttpClient) {
  }

  public update(commentId: number, comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(`${this.baseUrl}/${commentId}`, comment);
  }

  /**
   * 删除
   */
  public delete(commentId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${commentId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string, restaurantId?: number}): Observable<Page<Comment>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('restaurantId', isNotNullOrUndefined(param.restaurantId) ? param.restaurantId : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Comment>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Comment>(data).toObject(o => new Comment(o))));
  }

  public save(comment: Comment): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, comment);
  }

  public getById(commentId: number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.baseUrl}/${commentId.toString()}`);
  }

  public getAll(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/getAll`);
  }

  public getByRestaurantId(restaurantId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/getByRestaurant/${restaurantId.toString()}`);
  }

  public getByRiderId(riderId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/getByRiderId/${riderId.toString()}`);
  }

}
