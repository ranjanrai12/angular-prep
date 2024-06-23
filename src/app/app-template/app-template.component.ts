import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app-template.component.html',
  styleUrl: './app-template.component.scss'
})
export class AppTemplateComponent {
  constructor(private readonly http: HttpClient) {}

  obj = {} as any;

  throwError1() {
    // this.obj.test();
    this.http.get('https://demo.com34').subscribe({
      next: (val) => {
        console.log(val);
      }
    });
  }

  throwError2() {
    try {
      this.obj.test();
    } catch (err) {
      throw err;
    }
  }
}
