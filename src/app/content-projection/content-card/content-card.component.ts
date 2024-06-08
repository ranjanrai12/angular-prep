import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [],
  providers: [{ provide: 'Token', useValue: 'token value' }],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentCardComponent implements AfterContentInit, AfterContentChecked, OnChanges, DoCheck {
  constructor(private readonly renderer: Renderer2, private cdr: ChangeDetectorRef) {}
  @Input() user: { name: string } = {} as { name: string };
  @Input() user1: string = '';

  // @ContentChild('h1', { static: false }) headerElement: ElementRef | undefined;
  @ContentChildren('item') items: QueryList<ElementRef> | undefined;
  // ngAfterContentInit(): void {
  //   console.log('Child Content Init');
  //   console.log('ContentChild headerElement:', this.headerElement);
  //   // this.renderer.setStyle(this.headerElement?.nativeElement, 'color', 'green');
  // }
  ngAfterContentChecked(): void {
    // console.log('Child Content Init');
    // console.log('ContentChild headerElement:', this.headerElement);
    // this.renderer.setStyle(this.headerElement?.nativeElement, 'color', 'green');
  }
  ngAfterContentInit(): void {
    // console.log('Child Content Init');
    // console.log('ContentChild headerElement:', this.headerElement);
    // this.renderer.setStyle(this.headerElement?.nativeElement, 'color', 'green');
    // console.log('ContentChildren headerELement', this.items);
    this.items?.forEach((item) => this.renderer.setStyle(item.nativeElement, 'color', 'green'));
    if (this.items) {
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.user);
  }

  ngDoCheck() {
    console.log('Child Change detection');
  }

  increament() {}
}
