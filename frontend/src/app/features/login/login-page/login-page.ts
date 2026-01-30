import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { User } from '../../../models/User';
import { AuthUserService } from '../../../services/auth-user-service';
import { UserService } from '../../../services/user-service';
import { SharedModule } from '../../../shared/shared-module';
import { Login } from '../model/Login';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit{
  showLogin = signal(true);
  userService = inject(UserService)
  authService = inject(AuthUserService)
  private router = inject(Router);

  isLoginInvalid: boolean = false

  ngOnInit() {
    this.authService.logout()
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
      senha: this.loginForm.value.senha as string
    }

    this.userService.loginUser(login).subscribe(
      (response) => {
        this.router.navigate(['/home']);
        this.authService.setUser(response)
        this.isLoginInvalid = false
      },
      (err) => {
        this.isLoginInvalid = true
        console.log('Erro ao fazer login!', err);
      }
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
        this.authService.setUser(response)
      },
      (err) => {
        console.log('Erro ao atualizar perfil', err);
      }
    );
  }

  findByUsername() {
      this.singinForm
      .get('username')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(username =>
          this.userService.findByUsername(username)
        )
      )
      .subscribe({
        next: (response) => {
          this.singinForm.get('username')?.setErrors({ usernameExists: true });
        },
        error: (error) => {
          this.singinForm.get('username')?.setErrors(null);
        }
      });
    }
}
