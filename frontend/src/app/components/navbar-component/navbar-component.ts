import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialog } from '../user/user-form-dialog/user-form-dialog';
import { UserService } from '../user/service/user-service';

@Component({
  selector: 'app-navbar-component',
  imports: [MatCardModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  @Input() nomeCompleto: string = '';
  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService) {

  }

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
}
