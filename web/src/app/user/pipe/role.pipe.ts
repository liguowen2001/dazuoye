import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value){
      case 0:
        return '管理员';
      case 1:
        return '饭店';
      case 2:
        return '食客';
      default:
        return '-';
    }
  }

}
