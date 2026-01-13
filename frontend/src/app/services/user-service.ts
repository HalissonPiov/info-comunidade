import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string = 'http://localhost:8080/usuarios';
  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.httpClient.post(this.BASE_URL, user);
  }

  updateUserData(id: string, user: User): Observable<any> {
    return this.httpClient.put(this.BASE_URL + `/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + `/${id}`);
  }
}
