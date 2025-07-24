import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusBadge' })
export class StatusBadgePipe implements PipeTransform {
  private statusMap: Record<string, { text: string; class: string }> = {
    A: { text: 'Active', class: 'badge-success' },
    P: { text: 'Pending', class: 'badge-warning' }
  };

  transform(value: string): { text: string; class: string } {
    return this.statusMap[value] || { text: 'Unknown', class: 'badge-secondary' };
  }
}
