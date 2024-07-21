import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe',
  standalone: true
})
export class CustomPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (!value) return '';
    return value.toUpperCase();
  }
}
