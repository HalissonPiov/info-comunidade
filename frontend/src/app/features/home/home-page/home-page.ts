import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FilterComponent } from '../../../components/filter-component/filter-component';
import { PublicacaoFormComponent } from '../../../components/publicacao/publicacao-form-component/publicacao-form-component';
import { Publicacao } from '../../../models/Publicacao';
import { TipoPublicacao } from '../../../models/TipoPublicacao';
import { PublicacaoService } from '../../../services/publicacao-service';
import { buildQueryParams, ordenarPorDataDesc } from '../../../services/utils-service';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-home-page',
  imports: [SharedModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  public PUBLICACAO_DATA: Publicacao[] = [];
  public INFORMATIVO_DATA: Publicacao[] = [];
  public OCORRECIA_DATA: Publicacao[] = [];

  private publicacaoService: PublicacaoService = inject(PublicacaoService);

  readonly dialog = inject(MatDialog);
  public TipoPublicacao = TipoPublicacao;
  selectedTabIndex = 1;

  ngOnInit(): void {
    this.selectedTabIndex = 1;

    this.findAllPublicacoes();
    this.findAllOcorrencia();
    this.findInformativos();
  }

  openCreatePublicacaoDialog(): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '45vw',
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
    this.publicacaoService.findAll(filtros).subscribe(
      (response) => {
        this.PUBLICACAO_DATA = ordenarPorDataDesc(response);
      },
      (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    );
  }

  findAllOcorrencia(filtros?: HttpParams) {
    this.publicacaoService.findOcorrecia(filtros).subscribe(
      (response) => {
        this.OCORRECIA_DATA = ordenarPorDataDesc(response);
      },
      (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    );
  }

  findInformativos(filtros?: HttpParams) {
    this.publicacaoService.findInformativos(filtros).subscribe(
      (response) => {
        this.INFORMATIVO_DATA = ordenarPorDataDesc(response);
      },
      (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    );
  }

  reloadPublicacoes() {
    this.selectedTabIndex = 1;
    this.findAllPublicacoes();
    this.findAllOcorrencia();
    this.findInformativos();
  }

  aplicarFiltros(tipo: TipoPublicacao, filtros: any) {
    const params = buildQueryParams(filtros);
    console.log(params);

    switch (tipo) {
      case TipoPublicacao.OCORRENCIA:
        this.findAllOcorrencia(params);
        break;

      case TipoPublicacao.INFORMATIVO:
        this.findInformativos(params);
        break;

      case TipoPublicacao.PUBLICACAO:
        this.findAllPublicacoes(params);
    }
  }
}
