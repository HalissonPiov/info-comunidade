import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private BASE_URL: string = "http://localhost:8080/usuarios"
  constructor(private httpClient: HttpClient) {}

  getUserInLocalStorage(): User {
    return JSON.parse(localStorage.getItem("LOGGED_USER") || "") as User;
  }

  updateUserData(id: string, user: User): Observable<any> {
    return this.httpClient.put(this.BASE_URL + `/${id}`, user)
  }
}
