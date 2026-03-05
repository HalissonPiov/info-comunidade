import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

import { UserDeleteDialog } from '../../components/user/user-delete-dialog/user-delete-dialog';
import { Endereco } from '../../models/Endereco';
import { User } from '../../models/User';
import { AuthUserService } from '../../services/auth-user-service';
import { EnderecoService } from '../../services/endereco-service';
import { UserService } from '../../services/user-service';
import { SharedModule } from './../../shared/shared-module';

@Component({
  selector: 'app-edit-profile',
  imports: [SharedModule, ReactiveFormsModule, ButtonModule, ToastModule, RippleModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  private userService = inject(UserService);
  private authService = inject(AuthUserService);
  private enderecoService = inject(EnderecoService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private messageService = inject(MessageService);

  public BAIRROS_UNICOS: string[] = [];
  isLoginInvalid: boolean = false;
  showPassword: boolean = false;
  today = new Date().toISOString().split('T')[0];

  data = this.authService.getUserFromStorage();

  private formBuilder = inject(FormBuilder);

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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Message Content' });
  }

  private patchUser() {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  updateUser() {
    const id = this.authService.getUserFromStorage()?.id;
    if (!id) return;

    const user: User = {
      nome: this.userForm.value.nome as string,
      username: this.userForm.value.username as string,
      bairro: this.userForm.value.bairro as string,
      dataNascimento: this.userForm.value.dataNascimento as string,
      senha: this.userForm.value.senha as string,
    };

    this.userService.updateUserData(id, user).subscribe({
      next: (response) => {
        this.authService.setUser(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Perfil atualizado!',
        });
      },
      error: (err) => {
        console.log('Erro ao atualizar perfil', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o perfil!',
        });
      },
    });
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

    if (username === this.authService.getUserFromStorage()?.username) {
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
