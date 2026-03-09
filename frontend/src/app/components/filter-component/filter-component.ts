import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

import { Endereco } from '../../models/Endereco';
import { TipoPublicacao } from '../../models/TipoPublicacao';
import { EnderecoService } from '../../services/endereco-service';

@Component({
  selector: 'app-filter-component',
  imports: [TitleCasePipe, ReactiveFormsModule, CommonModule],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css',
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<any>();
  public TipoPublicacao = TipoPublicacao;
  public BAIRROS_UNICOS: string[] = [];

  private enderecoService: EnderecoService = inject(EnderecoService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  public publicacaoForm = this.formBuilder.group({
    titulo: [''],
    bairro: [''],
    dataCriacao: [''],
    hashtags: [''],
  });

  ngOnInit(): void {
    this.getEnderecos();
    this.publicacaoForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.filterChange.emit(value);
    });
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

  createPublication() {
    this.router.navigate(['/create-publication']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
