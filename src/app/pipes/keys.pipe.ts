import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  standalone: true
})
export class KeysPipe implements PipeTransform {
  transform(value: object): string[] {
    if (!value || typeof value !== 'object') return [];
    return Object.keys(value);
  }
}
