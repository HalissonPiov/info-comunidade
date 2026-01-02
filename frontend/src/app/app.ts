import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar-component/navbar-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    NavbarComponent
  ]
})
export class App {
  protected readonly title = signal('frontend');
}
