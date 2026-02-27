import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, startWith, Subject, switchMap } from 'rxjs';

import { FilterComponent } from '../../components/filter-component/filter-component';
import { PublicacaoFormComponent } from '../../components/publicacao/publicacao-form-component/publicacao-form-component';
import { TipoPublicacao } from '../../models/TipoPublicacao';
import { PublicacaoService } from '../../services/publicacao-service';
import { buildQueryParams, ordenarPorDataDesc } from '../../services/utils-service';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-home-page',
  imports: [SharedModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private publicacaoService = inject(PublicacaoService);

  readonly dialog = inject(MatDialog);
  public TipoPublicacao = TipoPublicacao;
  selectedTabIndex = 1;

  private reloadPublicacoes$ = new Subject<HttpParams | undefined>();
  private reloadOcorrencias$ = new Subject<HttpParams | undefined>();
  private reloadInformativos$ = new Subject<HttpParams | undefined>();

  public publicacoes$ = this.reloadPublicacoes$.pipe(
    startWith(undefined),
    switchMap((params) =>
      this.publicacaoService.findAll(params).pipe(
        map((response) => ordenarPorDataDesc(response)),
        catchError((err) => {
          console.log('Erro ao buscar publicações!', err);
          return [];
        }),
      ),
    ),
  );

  public ocorrencias$ = this.reloadOcorrencias$.pipe(
    startWith(undefined),
    switchMap((params) =>
      this.publicacaoService.findOcorrecia(params).pipe(
        map((response) => ordenarPorDataDesc(response)),
        catchError((err) => {
          console.log('Erro ao buscar ocorrências!', err);
          return [];
        }),
      ),
    ),
  );

  public informativos$ = this.reloadInformativos$.pipe(
    startWith(undefined),
    switchMap((params) =>
      this.publicacaoService.findInformativos(params).pipe(
        map((response) => ordenarPorDataDesc(response)),
        catchError((err) => {
          console.log('Erro ao buscar informativos!', err);
          return [];
        }),
      ),
    ),
  );

  ngOnInit(): void {
    this.selectedTabIndex = 1;
    this.reloadPublicacoes();
  }

  openCreatePublicacaoDialog(): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { isCreating: true },
    });

    dialogRef.afterClosed().subscribe((salvou: boolean) => {
      if (salvou) {
        this.reloadPublicacoes();
      }
    });
  }

  openFilterDialog(tipo: TipoPublicacao): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: { tipo },
    });

    dialogRef.afterClosed().subscribe((filtros) => {
      if (!filtros) return;
      this.aplicarFiltros(filtros.tipo, filtros.filtros);
    });
  }

  findAllPublicacoes(filtros?: HttpParams) {
    this.publicacaoService.findAll(filtros).subscribe({
      next: () => {
        this.reloadPublicacoes$.next(filtros!);
      },
      error: (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    });
  }

  findAllOcorrencia(filtros?: HttpParams) {
    this.publicacaoService.findOcorrecia(filtros).subscribe({
      next: () => {
        this.reloadOcorrencias$.next(filtros!);
      },
      error: (err) => {
        console.log('Erro ao buscar ocorrências!', err);
      },
    });
  }

  findInformativos(filtros?: HttpParams) {
    this.publicacaoService.findInformativos(filtros).subscribe({
      next: () => {
        this.reloadInformativos$.next(filtros!);
      },
      error: (err) => {
        console.log('Erro ao buscar informativos!', err);
      },
    });
  }

  reloadPublicacoes() {
    this.selectedTabIndex = 1;
    this.reloadPublicacoes$.next(undefined);
    this.reloadInformativos$.next(undefined);
    this.reloadOcorrencias$.next(undefined);
  }

  aplicarFiltros(tipo: TipoPublicacao, filtros: any) {
    const params = buildQueryParams(filtros);

    switch (tipo) {
      case TipoPublicacao.OCORRENCIA:
        this.reloadOcorrencias$.next(params);
        break;

      case TipoPublicacao.INFORMATIVO:
        this.reloadInformativos$.next(params);
        break;

      case TipoPublicacao.PUBLICACAO:
        this.reloadPublicacoes$.next(params);
    }
  }
}
