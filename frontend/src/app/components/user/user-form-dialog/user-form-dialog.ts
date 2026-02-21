import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service';
import { SharedModule } from '../../../shared/shared-module';
import { AuthUserService } from './../../../services/auth-user-service';
import { EnderecoService } from '../../../services/endereco-service';
import { Endereco } from '../../../models/Endereco';
import { notBlankValidator } from '../../../services/utils-service';

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
  public BAIRROS_UNICOS: string[] = [];
  private enderecoService: EnderecoService = inject(EnderecoService);
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
    this.findByUsername();
    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
    }
    this.getEnderecos();
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
      },
    );
  }

  findByUsername() {
    this.userForm
      .get('username')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((username) => {
          if (!username || username.trim().length === 0) {
            const control = this.userForm.get('username');

            control?.setErrors({ ...control.errors, blank: true });
            return of(false);
          }

          if (username === this.authUserService.getUserFromStorage()?.username) {
            return of(false);
          }

          return this.userService.findByUsername(username).pipe(
            map(() => true),
            catchError(() => of(false)),
          );
        }),
      )
      .subscribe((usernameExists) => {
        const control = this.userForm.get('username');

        if (usernameExists) {
          control?.setErrors({ ...control.errors, usernameExists: true });
        } else {
          const errors = control?.errors;
          if (errors) {
            delete errors['usernameExists'];
            if (Object.keys(errors).length === 0) {
              control.setErrors(null);
            } else {
              control.setErrors(errors);
            }
          }
        }
      });
  }

  getEnderecos() {
    this.enderecoService.findAll().subscribe(
      (response) => {
        this.BAIRROS_UNICOS = response;
        const bairrosSet = new Set(response.map((endereco: Endereco) => endereco.bairro));
        this.BAIRROS_UNICOS = Array.from(bairrosSet).sort() as string[];
      },
      (err) => {
        console.log('Erro ao buscar endereços!', err);
      },
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
