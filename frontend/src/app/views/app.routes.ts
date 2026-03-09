import { Routes } from '@angular/router';

import { HomePage } from './home/home-page';
import { LoginPage } from './login/login-page/login-page';
import { PersonalPublications } from './personal-publications/personal-publications';
import { EditProfile } from './edit-profile/edit-profile';
import { CreatePublication } from './create-publication/create-publication';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      { path: 'personal-publications', component: PersonalPublications },
      { path: 'edit-profile', component: EditProfile },
    ],
  },
  {
    path: 'personal-publications',
    component: PersonalPublications,
  },
  {
    path: 'edit-profile',
    component: EditProfile,
  },
  {
    path: 'create-publication',
    component: CreatePublication,
  },
];
