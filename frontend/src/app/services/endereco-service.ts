import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private BASE_URL: string = 'http://localhost:8080/enderecos';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }

  findByBairro(bairro: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL+"/bairro?bairro="+bairro);
  }
}
