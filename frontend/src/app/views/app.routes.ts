import { Routes } from '@angular/router';

import { HomePage } from './home/home-page/home-page';
import { LoginPage } from './login/login-page/login-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'home',
    component: HomePage
  }
];

