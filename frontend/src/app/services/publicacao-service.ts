import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicacaoService {
   private BASE_URL: string = 'http://localhost:8080/publicacao';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }
}
