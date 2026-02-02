import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Publicacao } from '../../models/Publicacao';
import { PublicacaoFormComponent } from '../publicacao/publicacao-form-component/publicacao-form-component';

@Component({
  selector: 'app-card-component',
  standalone: true,
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
  imports: [MatCardModule, MatButtonModule, DatePipe, MatDialogModule],
})
export class CardComponent {
  @Input() publicacao!: Publicacao;
  @Input() showOptions: boolean = false;
  @Input() nomeUsuario: string = '';
  @Input() nomeCompleto: string = '';
  @Input() date: string = '';

  readonly dialog = inject(MatDialog);

  openCreatePublicacaoDialog(publicacao: Publicacao): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: {publicacao: publicacao, isCreating: false},
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
