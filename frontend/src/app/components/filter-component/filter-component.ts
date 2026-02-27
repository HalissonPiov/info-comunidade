import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { Endereco } from '../../models/Endereco';
import { TipoPublicacao } from '../../models/TipoPublicacao';
import { EnderecoService } from '../../services/endereco-service';

@Component({
  selector: 'app-filter-component',
  imports: [TitleCasePipe, ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css',
})
export class FilterComponent implements OnInit, OnDestroy {
  public TipoPublicacao = TipoPublicacao;
  public BAIRROS_UNICOS: string[] = [];

  private enderecoService: EnderecoService = inject(EnderecoService);

  readonly dialogRef = inject(MatDialogRef<FilterComponent>);
  readonly data = inject<{ tipo: TipoPublicacao }>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  private destroy$ = new Subject<void>();

  public publicacaoForm = this.formBuilder.group({
    titulo: [''],
    bairro: [''],
    setor: [''],
    publicoAlvo: [''],
    dataCriacao: [''],
    hashtags: [''],
  });

  ngOnInit(): void {
    this.getEnderecos();
  }

  getEnderecos() {
    this.enderecoService.findAll().subscribe({
      next: (response) => {
        const bairrosSet = new Set(response.map((endereco: Endereco) => endereco.bairro));
        this.BAIRROS_UNICOS = Array.from(bairrosSet).sort() as string[];
      },
      error: (err) => {
        console.log('Erro ao buscar endereços!', err);
      },
    });
  }

  onFormSubmit() {
    this.dialogRef.close({
      tipo: this.data.tipo,
      filtros: this.publicacaoForm.value,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
