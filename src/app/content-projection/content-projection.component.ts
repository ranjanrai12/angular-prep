import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContentCardComponent } from './content-card/content-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-projection',
  standalone: true,
  imports: [ContentCardComponent, CommonModule],
  templateUrl: './content-projection.component.html',
  styleUrl: './content-projection.component.scss',
})
export class ContentProjectionComponent implements OnInit, AfterContentInit {
  headerVisibility: boolean = false;
  @ViewChild('para', { static: false }) para: ElementRef | undefined;
  @ViewChild(ContentCardComponent, { static: false })
  contentCardComponent: ContentCardComponent | undefined;
  user = { name: 'ranjan' };
  user1 = '';

  ngOnInit(): void {
    if (this?.para?.nativeElement.innerHTML) {
      this.para.nativeElement.innerHTML = 'new text';
    }
  }

  ngAfterContentInit(): void {
    console.log('Parent ngAfterContentInit called');
  }

  ngAfterViewInit() {
    console.log(this?.para?.nativeElement.innerHTML);
    if (this?.para?.nativeElement.innerHTML) {
      this.para.nativeElement.innerHTML = 'new text';
    }
  }

  onClick() {
    this.user.name = 'shyam';
    // this.user1 = 'Mohan';
    this.headerVisibility = !this.headerVisibility;
    console.log(this.contentCardComponent);
    setTimeout(() => {
      if (this?.para?.nativeElement.innerHTML) {
        this.para.nativeElement.innerHTML = 'new text';
      }
    }, 0);
  }
}
