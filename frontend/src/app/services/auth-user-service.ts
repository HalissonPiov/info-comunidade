import { Injectable, signal } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private readonly _user = signal<User | null>(this.getUserFromStorage());

  user = this._user.asReadonly();

  isLoggedIn = () => !!this._user();

  setUser(user: User) {
    localStorage.setItem('LOGGED_USER', JSON.stringify(user));
    this._user.set(user);
  }

  logout() {
    localStorage.removeItem('LOGGED_USER');
    this._user.set(null);
  }

  getUserFromStorage(): User | null {
    const data = localStorage.getItem('LOGGED_USER');
    return data ? JSON.parse(data) : null;
  }
}
