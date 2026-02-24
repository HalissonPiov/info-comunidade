import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioDTO } from '../models/ComentarioDTO';
import { Comentario } from '../models/Comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private BASE_URL: string = 'http://localhost:8080/comentarios';
  constructor(private httpClient: HttpClient) {}

  createComment(comment: ComentarioDTO): Observable<void> {
    return this.httpClient.post<void>(this.BASE_URL, comment);
  }

  findCommentsByPublicacaoId(idPublicacao: string): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(this.BASE_URL+"/por-publicacao/" + idPublicacao)
  }

  updateComment(id: string, comment: ComentarioDTO): Observable<void> {
    return this.httpClient.put<void>(this.BASE_URL + "/" + id, comment);
  }

  deleteComment(id: string) : Observable<void> {
    return this.httpClient.delete<void>(this.BASE_URL +"/" + id)
  }
}
