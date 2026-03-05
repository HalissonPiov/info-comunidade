import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { AuthUserService } from '../../../services/auth-user-service';
import { UserService } from '../../../services/user-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-delete-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './user-delete-dialog.html',
  styleUrl: './user-delete-dialog.css',
})
export class UserDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<UserDeleteDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  private router = inject(Router);
  private authUserService = inject(AuthUserService);
  private userService = inject(UserService);
  private messageService = inject(MessageService)

  closeDialog() {
    this.dialogRef.close();
  }

  deleteUser() {
    const id = this.authUserService.getUserFromStorage()?.id;
    if (!id) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.authUserService.logout();
        this.dialogRef.close(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Conta excluída!',
        });
      },
      error: (err) => {
        console.log('Erro ao atualizar perfil', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível excluir a conta!',
        });
      },
    });
  }
}
