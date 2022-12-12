import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value) {
      case 1:
        return '已支付';
      case 2:
        return '已接单';
      case 3:
        return '已出单';
      case 4:
        return '派送中';
      case 5:
        return '待评价';
      case 6:
        return '完成';
      default:
        return '-'
    }
  }

}
