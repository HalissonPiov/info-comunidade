import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

import { Endereco } from '../../../models/Endereco';
import { User } from '../../../models/User';
import { EnderecoService } from '../../../services/endereco-service';
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
  private authUserService = inject(AuthUserService);
  private enderecoService = inject(EnderecoService);
  private userService = inject(UserService);

  public BAIRROS_UNICOS: string[] = [];
  today = new Date().toISOString().split('T')[0];
  showPassword: boolean = false;

  public userForm = this.formBuilder.group({
    nome: ['', Validators.required],
    username: ['', Validators.required],
    bairro: [''],
    dataNascimento: [''],
    senha: ['', Validators.required],
  });

  ngOnInit(): void {
    this.listenUsernameChanges();
    this.patchUser();
    this.loadEnderecos();
  }

  private patchUser() {
    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  private listenUsernameChanges() {
    const control = this.userForm.get('username');

    control?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((username) => this.validateUsername(username)),
      )
      .subscribe((exists) => {
        if (exists) {
          control.setErrors({ usernameExists: true });
        } else {
          this.clearError(control, 'usernameExists');
        }
      });
  }

  private validateUsername(username: string | null) {
    if (!username?.trim() || !username) {
      return of(false);
    }

    if (username === this.authUserService.getUserFromStorage()?.username) {
      return of(false);
    }

    return this.userService.findByUsername(username).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  private clearError(control: any, errorKey: string) {
    const errors = control.errors;

    if (!errors) return;

    delete errors[errorKey];

    if (Object.keys(errors).length === 0) {
      control.setErrors(null);
    } else {
      control.setErrors(errors);
    }
  }

  onFormSubmit() {
    if (this.userForm.invalid) return;

    if (this.data.action === 'edicao') {
      this.updateUser();
    }
  }

  updateUser() {
    const id = this.authUserService.getUserFromStorage()?.id;
    if (!id) return;

    const user: User = {
      nome: this.userForm.value.nome as string,
      username: this.userForm.value.username as string,
      bairro: this.userForm.value.bairro as string,
      dataNascimento: this.userForm.value.dataNascimento as string,
      senha: this.userForm.value.senha as string,
    };

    this.userService.updateUserData(id, user).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log('Erro ao atualizar perfil', err);
      },
    });
  }

  loadEnderecos() {
    this.enderecoService.findAll().subscribe({
      next: (response) => {
        const bairrosSet = new Set(response.map((endereco: Endereco) => endereco.bairro));
        this.BAIRROS_UNICOS = Array.from(bairrosSet).sort() as string[];
      },
      error: (err) => {
        console.log('Erro ao buscar endereços!', err);
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
