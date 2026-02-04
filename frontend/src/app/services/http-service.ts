import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  buildQueryParams(filtros: any) {
    let params: HttpParams = new HttpParams();

    Object.keys(filtros).forEach((key) => {
      if (filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    });

    return params;
  }
}
