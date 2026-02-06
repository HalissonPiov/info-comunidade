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
  userService = inject(UserService);
  authService = inject(AuthUserService);
  private router = inject(Router);
  public BAIRROS_UNICOS: string[] = [];
  private enderecoService: EnderecoService = inject(EnderecoService);

  isLoginInvalid: boolean = false;

  ngOnInit() {
    this.findByUsername();
    this.authService.logout();
    this.getEnderecos();
  }

  toggleForm() {
    this.showLogin.update((v) => !v);
  }

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

  onLoginFormSubmit() {
    const login: Login = {
      username: this.loginForm.value.username as string,
      senha: this.loginForm.value.senha as string,
    };

    this.userService.loginUser(login).subscribe(
      (response) => {
        this.router.navigate(['/home']);
        this.authService.setUser(response);
        this.isLoginInvalid = false;
      },
      (err) => {
        this.isLoginInvalid = true;
        console.log('Erro ao fazer login!', err);
      },
    );
  }

  onSingInFormSubmit() {
    const user: User = {
      nome: this.singinForm.value.nome as string,
      username: this.singinForm.value.username as string,
      bairro: this.singinForm.value.bairro as string,
      dataNascimento: this.singinForm.value.dataNascimento as string,
      senha: this.singinForm.value.senha as string,
    };

    this.userService.createUser(user).subscribe(
      (response) => {
        this.router.navigate(['/home']);
        this.authService.setUser(response);
      },
      (err) => {
        console.log('Erro ao atualizar perfil', err);
      },
    );
  }

  findByUsername() {
    this.singinForm
      .get('username')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((username) =>
          this.userService.findByUsername(username).pipe(
            map(() => true),
            catchError(() => of(false)),
          ),
        ),
      )
      .subscribe((usernameExists) => {
        const control = this.singinForm.get('username');
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
}
