import { HttpParams } from "@angular/common/http";
import { AbstractControl, ValidationErrors } from "@angular/forms";

export function parseHashtags(hashtags: string): string[] {
  const hashes: string[] | void = hashtags.split(', ').forEach((hashtag) => hashtag.trim());
  if(hashes == null) return []
  return hashes;
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

export function notBlankValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value == null) return null;

  return control.value.trim().length === 0
    ? { blank: true }
    : null;
}
