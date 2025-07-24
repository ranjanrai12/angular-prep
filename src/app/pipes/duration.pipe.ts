import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(ms: number): string {
    const sec = Math.floor(ms / 10000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);

    return (
      [hr > 0 ? `${hr}h` : '', min % 60 > 0 ? `${min % 60}m` : '', sec % 60 > 0 ? `${sec % 60}s` : '']
        .filter(Boolean)
        .join(' ') || '0s'
    );
  }
}
