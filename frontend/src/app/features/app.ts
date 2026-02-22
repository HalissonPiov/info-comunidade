import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar-component/navbar-component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    NavbarComponent,
    MatTabsModule,
    RouterOutlet
  ]
})
export class App {
  protected readonly title = signal('frontend');

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = event.urlAfterRedirects !== '/login';
      });
  }
}
