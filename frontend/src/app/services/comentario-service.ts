import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioDTO } from '../models/ComentarioDTO';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private BASE_URL: string = 'http://localhost:8080/comentarios';
  constructor(private httpClient: HttpClient) {}

  createComment(comment: ComentarioDTO): Observable<any> {
    return this.httpClient.post(this.BASE_URL, comment);
  }

  findCommentsByPublicacaoId(idPublicacao: string): Observable<any> {
    return this.httpClient.get(this.BASE_URL+"/por-publicacao/" + idPublicacao)
  }

  updateComment(id: string, comment: ComentarioDTO): Observable<any> {
    return this.httpClient.put(this.BASE_URL + "/" + id, comment);
  }

  deleteComment(id: string) : Observable<any> {
    return this.httpClient.delete(this.BASE_URL +"/" + id)
  }
}
