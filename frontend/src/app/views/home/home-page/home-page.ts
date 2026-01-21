import { PublicacaoService } from './../../../services/publicacao-service';
import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { PublicacaoFormComponent } from '../../../components/publicacao/publicacao-form-component/publicacao-form-component';
import { MatDialog } from '@angular/material/dialog';
import { Publicacao } from '../../../models/Publicacao';
import { Route, Router } from '@angular/router';

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

  ngOnInit(): void {
    this.findAllPublicacoes();
    this.findAllOcorrencia();
    this.findInformativos();
  }

  openCreatePublicacaoDialog(): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });
  }

  findAllPublicacoes() {
    this.publicacaoService.findAll().subscribe(
      (response) => {
        this.PUBLICACAO_DATA = response;
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
        this.OCORRECIA_DATA = response;
      },
      (err) => {
        console.log('Erro ao buscar publicações!', err);
      },
    );
  }
}
