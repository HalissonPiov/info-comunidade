import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Publicacao } from '../../models/Publicacao';
import { PublicacaoFormComponent } from '../publicacao/publicacao-form-component/publicacao-form-component';
import { PublicacaoDeleteDialog } from '../publicacao/publicacao-delete-dialog/publicacao-delete-dialog';

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

  @Output() updated = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  readonly dialog = inject(MatDialog);

  openUpdatePublicacaoDialog(publicacao: Publicacao): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { publicacao: publicacao, isCreating: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.updated.emit();
      }
    });
  }

  openDeletePublicacaoDialog(publicacao: Publicacao): void {
    const dialogRef = this.dialog.open(PublicacaoDeleteDialog, {
      width: '300px',
      data: { publicacao },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleted.emit();
      }
    });
  }
}
