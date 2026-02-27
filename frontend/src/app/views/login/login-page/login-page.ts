import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

import { Endereco } from '../../../models/Endereco';
import { User } from '../../../models/User';
import { AuthUserService } from '../../../services/auth-user-service';
import { EnderecoService } from '../../../services/endereco-service';
import { UserService } from '../../../services/user-service';
import { SharedModule } from '../../../shared/shared-module';
import { Login } from '../model/Login';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  showLogin = signal(true);

  private userService = inject(UserService);
  private authService = inject(AuthUserService);
  private enderecoService = inject(EnderecoService);
  private router = inject(Router);

  public BAIRROS_UNICOS: string[] = [];
  isLoginInvalid: boolean = false;
  showPassword: boolean = false;
  today = new Date().toISOString().split('T')[0];

  private formBuilder = inject(FormBuilder);

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    senha: ['', Validators.required],
  });

  public singinForm = this.formBuilder.group({
    nome: ['', Validators.required],
    username: ['', Validators.required],
    senha: ['', Validators.required],
    bairro: [''],
    dataNascimento: [''],
  });

  ngOnInit() {
    this.authService.logout();
    this.listenUsernameChanges();
    this.loadEnderecos();
  }

  toggleForm() {
    this.showLogin.update((v) => !v);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLoginFormSubmit() {
    if (!this.loginForm.valid) return;

    const login: Login = {
      username: this.loginForm.value.username as string,
      senha: this.loginForm.value.senha as string,
    };

    this.userService.loginUser(login).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        this.authService.setUser(response);
        this.isLoginInvalid = false;
      },
      error: (err) => {
        this.isLoginInvalid = true;
        console.log('Erro ao fazer login!', err);
      },
    });
  }

  onSingInFormSubmit() {
    if (!this.singinForm.valid) return;

    const user: User = {
      nome: this.singinForm.value.nome as string,
      username: this.singinForm.value.username as string,
      bairro: this.singinForm.value.bairro as string,
      dataNascimento: this.singinForm.value.dataNascimento as string,
      senha: this.singinForm.value.senha as string,
    };

    this.userService.createUser(user).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        this.authService.setUser(response);
      },
      error: (err) => {
        console.log('Erro ao criar usuário!', err);
      },
    });
  }

  private listenUsernameChanges() {
    const control = this.singinForm.get('username');

    control?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),

        switchMap((username) => {
          if (!username || username.trim().length === 0) {
            control.setErrors({ blank: true });
            return of(false);
          }

          return this.userService.findByUsername(username).pipe(
            map(() => true),
            catchError(() => of(false)),
          );
        }),
      )
      .subscribe((exists) => {
        const errors = control?.errors ?? {};

        if (exists) {
          control?.setErrors({ ...errors, usernameExists: true });
          return;
        }

        delete errors['usernameExists'];

        if (Object.keys(errors).length === 0) {
          control?.setErrors(null);
        } else {
          control?.setErrors(errors);
        }
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
}
