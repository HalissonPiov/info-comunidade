import { Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const storedUser = this.getUserFromStorage();
    if (storedUser) {
      this.userSubject.next(storedUser);
    }
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  logout() {
    localStorage.removeItem('LOGGED_USER');
    this.userSubject.next(null);
  }
}
