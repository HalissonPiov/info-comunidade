import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Publicacao } from '../../models/Publicacao';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
  imports: [MatCardModule, MatButtonModule, DatePipe],
})
export class CardComponent {
  @Input() publicacao!: Publicacao
  @Input() showOptions: boolean = false
  @Input() nomeUsuario: string = 'mclara831'
  @Input() nomeCompleto: string = 'Maria Clara Barbosa'
  @Input() date: string = '7 de outubro de 2025'
}
