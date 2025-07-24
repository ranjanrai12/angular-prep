import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values',
  standalone: true
})
export class ValuesPipe implements PipeTransform {
  transform(input: object): any[] {
    if (!input || typeof input !== 'object') return [];
    return Object.values(input);
  }
}
