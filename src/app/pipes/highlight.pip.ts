import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighLightPipe implements PipeTransform {
  transform(value: string, searchTerm: string) {
    if (!value && !searchTerm) return true;
    const regex = new RegExp(searchTerm, 'gi');
    return value.replace(regex, (match: any) => `<mark>${match}</mark>`);
  }
}
