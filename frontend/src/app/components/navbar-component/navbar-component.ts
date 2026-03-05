import { UserService } from './../../services/user-service';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { AuthUserService } from '../../services/auth-user-service';
import { SharedModule } from '../../shared/shared-module';
import { UserDeleteDialog } from '../user/user-delete-dialog/user-delete-dialog';
import { UserFormDialog } from '../user/user-form-dialog/user-form-dialog';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  imports: [MatCardModule, SharedModule, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);
  private authService = inject(AuthUserService);
  private userService = inject(UserService);

  user$ = this.authService.user$;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialog, {
      width: '500px',
      data: {
        user: this.authService.getUserFromStorage(),
        title: 'Editar dados',
        confirmationMessage: 'Salvar',
        action: 'edicao',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateProfile();
      }
    });
  }

  updateProfile() {
    const user = this.authService.getUserFromStorage();
    if (!user) return;
    this.userService.findById(user?.id!).subscribe({
      next: (response) => this.authService.setUser(response),
      error: (err) => console.log('Erro ao atualizar perfil', err),
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(UserDeleteDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
      }
    });
  }
}
