import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { SharedModule } from '../../../shared/shared-module';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service';
import { AuthUserService } from '../../../services/auth-user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  showLogin = signal(true);
  userService = inject(UserService)
  authService = inject(AuthUserService)
  private router = inject(Router);

  toggleForm() {
    this.showLogin.update((v) => !v);
  }

  private formBuilder = inject(FormBuilder);

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    senha: ['', Validators.required],
  });

  public singinForm = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    senha: ['', Validators.required],
    bairro: [''],
    dataNascimento: [''],
  });

  onLoginFormSubmit() {}

  onSingInFormSubmit() {
    const user: User = {
      nome: this.singinForm.value.name as string,
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
}
