import { Routes } from '@angular/router';

import { HomePage } from './home/home-page';
import { LoginPage } from './login/login-page/login-page';
import { PersonalPublications } from './personal-publications/personal-publications';

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
  },
  {
    path: 'personal-publications',
    component: PersonalPublications
  }
];

