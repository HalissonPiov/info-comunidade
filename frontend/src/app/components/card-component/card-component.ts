import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
  imports: [MatCardModule, MatButtonModule],
})
export class CardComponent {
  @Input() nomeUsuario: string = 'mclara831'
  @Input() nomeCompleto: string = 'Maria Clara Barbosa'
  @Input() date: string = '7 de outubro de 2025'
}
