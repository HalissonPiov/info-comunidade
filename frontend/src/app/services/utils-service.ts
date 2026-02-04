import { HttpParams } from "@angular/common/http";

export function parseHashtags(hashtags: string): string[] {
  return hashtags.split(', ');
}

export function buildQueryParams(filtros: any) {
  let params: HttpParams = new HttpParams();

  Object.keys(filtros).forEach((key) => {
    if (filtros[key]) {
      params = params.set(key, filtros[key]);
    }
  });

  return params;
}

export function ordenarPorDataDesc<T extends { dataCriacao: string }>(lista: T[]): T[] {
  return lista.sort((a, b) => {
    const dataA = new Date(a.dataCriacao).getTime();
    const dataB = new Date(b.dataCriacao).getTime();
    return dataB - dataA;
  });
}
