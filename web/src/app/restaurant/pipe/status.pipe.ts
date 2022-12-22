import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value == 0) {
      return '待认证';
    } else if (value == 1) {
      return '暂停营业';
    } else if (value == 2) {
      return '营业中';
    } else {
      return '-';
    }
  }

}
