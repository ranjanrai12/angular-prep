import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppTemplateComponent } from './app-template/app-template.component';
import { AppService } from './app-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, AppTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AppService]
})
export class AppComponent {
  constructor(private readonly router: Router) {}
  title = 'angular-preperation';

  sendMessage() {
    this.router.navigate(['content-projection'], { state: { message: 'Hello From Sender' } });
  }
}
