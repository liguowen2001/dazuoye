import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value == 0) {
      return '休息中';
    } else if (value == 1) {
      return '派送中';
    } else if (value == 2) {
      return '未分配订单';
    } else {
      return '-';
    }
  }

}
