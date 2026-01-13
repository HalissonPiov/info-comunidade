import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { AuthUserService } from '../../services/auth-user-service';
import { SharedModule } from '../../shared/shared-module';
import { UserDeleteDialog } from '../user/user-delete-dialog/user-delete-dialog';
import { UserFormDialog } from '../user/user-form-dialog/user-form-dialog';

@Component({
  selector: 'app-navbar-component',
  imports: [MatCardModule, SharedModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  readonly dialog = inject(MatDialog);
  private authService = inject(AuthUserService);

  isLoggedIn = this.authService.isLoggedIn;
  user = this.authService.user;

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialog, {
      width: '500px',
      data: {title: 'Editar dados', confirmationMessage: "Salvar", action: "edicao"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(UserDeleteDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
