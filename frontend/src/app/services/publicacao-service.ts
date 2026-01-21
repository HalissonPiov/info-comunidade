import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ocorrencia } from '../models/Ocorrencia';
import { Informativo } from '../models/Informativo';

@Injectable({
  providedIn: 'root',
})
export class PublicacaoService {
  private BASE_URL: string = 'http://localhost:8080/publicacao';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }

  findOcorrecia(): Observable<any> {
    return this.httpClient.get(this.BASE_URL+'/ocorrencia');
  }

  findInformativos(): Observable<any> {
    return this.httpClient.get(this.BASE_URL+'/informativo');
  }

  saveOcorrencia(ocorrecia: Ocorrencia) {
    return this.httpClient.post(this.BASE_URL+"/ocorrencia", ocorrecia);
  }

  saveInformativo(informativo: Informativo) {
    return this.httpClient.post(this.BASE_URL+"/informativo", informativo);
  }


}
