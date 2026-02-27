import { PublicacaoService } from './../../../services/publicacao-service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthUserService } from '../../../services/auth-user-service';
import { Publicacao } from '../../../models/Publicacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacao-delete-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './publicacao-delete-dialog.html',
  styleUrl: './publicacao-delete-dialog.css',
})
export class PublicacaoDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<PublicacaoDeleteDialog>);
  readonly data = inject<{ publicacao: Publicacao }>(MAT_DIALOG_DATA);
  private router = inject(Router);
  private authUserService = inject(AuthUserService);
  private publicacaoServive = inject(PublicacaoService);

  closeDialog() {
    this.dialogRef.close(true);
  }

  deletePublicacao() {
    const id = this.authUserService.getUserFromStorage()?.id;
    if (!id) return;

    if (this.data.publicacao.usuario.id !== id) return;

    const publicacaoId = this.data.publicacao.idPublicacao

    this.publicacaoServive.delete(publicacaoId).subscribe({
      next: () => {
        this.router.navigate(['/personal-publications']);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log('Erro ao atualizar perfil', err);
      },}
    );
  }
}
