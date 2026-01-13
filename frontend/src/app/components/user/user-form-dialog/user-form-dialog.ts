import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service';
import { SharedModule } from '../../../shared/shared-module';
import { AuthUserService } from './../../../services/auth-user-service';

@Component({
  selector: 'app-user-form-dialog',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './user-form-dialog.html',
  styleUrl: './user-form-dialog.css',
})
export class UserFormDialog {
  readonly dialogRef = inject(MatDialogRef<UserFormDialog>);
  readonly data = inject<{
    user?: User;
    title: string;
    confirmationMessage: string;
    action: string;
  }>(MAT_DIALOG_DATA);

  private formBuilder = inject(FormBuilder);
  private authUserService: AuthUserService = inject(AuthUserService);

  public userForm = this.formBuilder.group({
    nome: ['', Validators.required],
    username: ['', Validators.required],
    bairro: [''],
    dataNascimento: [''],
    senha: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  constructor(private userService: UserService) {}

  onFormSubmit() {
    if (this.data.action === 'edicao') {
      this.onUpdateSubmit();
    }
  }

  onUpdateSubmit() {
    const id = this.authUserService.getUserFromStorage()?.id;
    if (!id) return;

    const user: User = {
      nome: this.userForm.value.nome as string,
      username: this.userForm.value.username as string,
      bairro: this.userForm.value.bairro as string,
      dataNascimento: this.userForm.value.dataNascimento as string,
      senha: this.userForm.value.senha as string,
    };

    this.userService.updateUserData(id, user).subscribe(
      (response) => {
        this.dialogRef.close(true);
      },
      (err) => {
        console.log('Erro ao atualizar perfil', err);
      }
    );
  }

  findByUsername() {
    this.userForm
      .get('username')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((username) => this.userService.findByUsername(username))
      )
      .subscribe({
        next: (response) => {
          this.userForm.get('username')?.setErrors({ usernameExists: true });
        },
        error: (error) => {
          this.userForm.get('username')?.setErrors(null);
        },
      });
  }
}
