import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * 文件服务
 * @actor liguwoen
 */
@Injectable({
  providedIn: 'root'
})
export class FileService {

  protected baseUrl = 'file';

  constructor(private httpClient: HttpClient) { }

  /**
   * 保存
   * @param file
   * 返回文件名
   */
  public save(file: FormData): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/file`, file);
  }

  /**
   * 更新
   * @param file
   */
  public update(file: FormData): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/updateFile`, file);
  }

  /**
   * 删除
   */
  public delete(fileName: string): Observable<string> {
    let formData = new FormData();
    formData.append('fileName',fileName);
    return this.httpClient.post<string>(`${this.baseUrl}/delete`,formData);
  }
}
