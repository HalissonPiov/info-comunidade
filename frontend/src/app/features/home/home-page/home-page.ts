import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PublicacaoFormComponent } from '../../../components/publicacao/publicacao-form-component/publicacao-form-component';
import { Publicacao } from '../../../models/Publicacao';
import { PublicacaoService } from '../../../services/publicacao-service';
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
  readonly dialog = inject(MatDialog);
  publicacaoService: PublicacaoService = inject(PublicacaoService);

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
      data: {isCreating: true},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadPublicacoes()
    });
  }

  findAllPublicacoes() {
    this.publicacaoService.findAll().subscribe(
      (response) => {
        this.PUBLICACAO_DATA = response;
        console.log(response)
      },
      (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    );
  }

  findAllOcorrencia() {
    this.publicacaoService.findOcorrecia().subscribe(
      (response) => {
        this.OCORRECIA_DATA = response;

      },
      (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    );
  }

  findInformativos() {
    this.publicacaoService.findInformativos().subscribe(
      (response) => {
        this.INFORMATIVO_DATA = response;
      },
      (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    );
  }

  reloadPublicacoes() {
  this.findAllPublicacoes();
  this.findAllOcorrencia();
  this.findInformativos();
}
}
