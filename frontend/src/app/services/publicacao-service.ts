import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Informativo } from '../models/Informativo';
import { Ocorrencia } from '../models/Ocorrencia';
import { Publicacao } from '../models/Publicacao';

@Injectable({
  providedIn: 'root',
})
export class PublicacaoService {
  private BASE_URL: string = 'http://localhost:8080/publicacao';
  constructor(private httpClient: HttpClient) {}

  findAll(filtros?: HttpParams): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '?' + filtros);
  }

  findOcorrecia(filtros?: HttpParams): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/ocorrencia?' + filtros);
  }

  findInformativos(filtros?: HttpParams): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/informativo?' + filtros);
  }

  saveOcorrencia(ocorrecia: Ocorrencia) {
    return this.httpClient.post(this.BASE_URL + '/ocorrencia', ocorrecia);
  }

  saveInformativo(informativo: Informativo) {
    return this.httpClient.post(this.BASE_URL + '/informativo', informativo);
  }

  updateOcorrencia(id: string, ocorrecia: Ocorrencia) {
    return this.httpClient.put(this.BASE_URL + '/ocorrencia/' + id, ocorrecia);
  }

  updateInformativo(id: string, informativo: Informativo) {
    return this.httpClient.put(this.BASE_URL + '/informativo/' + id, informativo);
  }

  findAllByUserId(userId: string): Observable<Publicacao[]> {
    return this.httpClient.get<Publicacao[]>(this.BASE_URL + `/por-usuario/${userId}`);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<void>(this.BASE_URL + `/${id}`);
  }
}
