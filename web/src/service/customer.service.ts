import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Customer} from '../entity/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'customer';

  constructor(private httpClient: HttpClient) {
  }

  public update(customerId: number, customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.baseUrl}/${customerId}`, customer);
  }

  /**
   * 删除
   */
  public delete(customerId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${customerId.toString()}`);
  }


  public page(page: number, size: number, param: {name?: string,userName?: string}): Observable<Page<Customer>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('username', isNotNullOrUndefined(param.userName) ? param.userName : '');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Customer>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Customer>(data).toObject(o => new Customer(o))));

  }

  public save(customer: Customer): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}`, customer);
  }

  public getById(customerId: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/${customerId.toString()}`);
  }

  public getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseUrl}/getAll`);
  }

  public getByUserId(userId: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/getByUser/${userId.toString()}`);
  }

}
