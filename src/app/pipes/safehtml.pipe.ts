import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safehtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}
  transform(value: string) {
    if (!value) return '';
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
