import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { CardComponent } from './components/card-component/card-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    NavbarComponent,
    CardComponent
  ]
})
export class App {
  protected readonly title = signal('frontend');
}
