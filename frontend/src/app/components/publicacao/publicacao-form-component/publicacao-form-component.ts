import { PublicacaoService } from './../../../services/publicacao-service';
import { Ocorrencia } from './../../../models/Ocorrencia';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, Observable, switchMap } from 'rxjs';

import { Endereco } from '../../../models/Endereco';
import { EnderecoService } from '../../../services/endereco-service';
import { SharedModule } from '../../../shared/shared-module';
import { AuthUserService } from '../../../services/auth-user-service';
import { User } from '../../../models/User';
import { parseHashtags } from '../../../services/utils-service';
import { Informativo } from '../../../models/Informativo';

@Component({
  selector: 'app-publicacao-form-component',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './publicacao-form-component.html',
  styleUrl: './publicacao-form-component.css',
})
export class PublicacaoFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PublicacaoFormComponent>);
  private formBuilder = inject(FormBuilder);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  private enderecoService = inject(EnderecoService);
  private authUserService: AuthUserService = inject(AuthUserService);
  private publicacaoService: PublicacaoService = inject(PublicacaoService);

  public ENDERECO_DATA: Endereco[] = [];
  public ENDERECO_POR_BAIRRO_DATA!: Observable<any[]>;

  public publicacaoForm = this.formBuilder.group({
    titulo: ['', Validators.required],
    descricao: ['', Validators.required],
    hashtags: [''],
    rua: [''],
    bairro: [''],
    tipo: [''],
    imagemURL: [''],
    setor: [''],
    publicoAlvo: [''],
  });

  ngOnInit() {
    this.ENDERECO_POR_BAIRRO_DATA = this.publicacaoForm.get('bairro')!.valueChanges.pipe(
      filter((bairro) => !!bairro),
      switchMap((bairro) => this.enderecoService.findByBairro(bairro!)),
    );
    this.getEnderecos();

    this.publicacaoForm.get('tipo')?.valueChanges.subscribe((tipo) => {
      const setor = this.publicacaoForm.get('setor');
      const publicoAlvo = this.publicacaoForm.get('publicoAlvo');

      setor?.clearValidators();
      publicoAlvo?.clearValidators();

      if (tipo === 'OCORRENCIA') {
        setor?.setValidators([Validators.required]);
      }

      if (tipo === 'INFORMATIVO') {
        publicoAlvo?.setValidators([Validators.required]);
      }

      setor?.updateValueAndValidity();
      publicoAlvo?.updateValueAndValidity();
    });
  }

  getEnderecos() {
    this.enderecoService.findAll().subscribe(
      (response) => {
        this.ENDERECO_DATA = response;
      },
      (err) => {
        console.log('Erro ao buscar endereços!', err);
      },
    );
  }

  getEnderecosPorBairro() {
    const bairro = this.publicacaoForm.get('bairro')?.value;
    if (!bairro) return;
    this.enderecoService.findByBairro(bairro).subscribe(
      (response) => {
        this.ENDERECO_POR_BAIRRO_DATA = response;
      },
      (err) => {
        console.log('Erro ao buscar endereços!', err);
      },
    );
  }

  onFormSubmit() {
    const tipo = this.publicacaoForm.get('tipo')?.value;
    if (tipo && tipo === 'OCORRENCIA') {
      this.saveOcorrecia()
    }
    if (tipo && tipo === 'INFORMATIVO') {
      this.saveInformativo()
    }
    this.dialogRef.close();
  }

  saveOcorrecia() {
    const ocorrencia: Ocorrencia = {
      titulo: this.publicacaoForm.value.titulo as string,
      descricao: this.publicacaoForm.value.descricao as string,
      imagemURL: this.publicacaoForm.value.imagemURL as string,
      usuarioId: this.authUserService.getUserFromStorage()?.id as string,
      enderecoId: this.publicacaoForm.value.rua as string,
      setor: this.publicacaoForm.value.setor as string,
      hashtags: parseHashtags(this.publicacaoForm.value.hashtags!),
    };

    this.publicacaoService.saveOcorrencia(ocorrencia).subscribe(
      (response) => {},
      (err) => {
        console.log('Não foi possível cadastrar ocorrência!', err);
      },
    );
  }

  saveInformativo() {
    const informativo: Informativo = {
      titulo: this.publicacaoForm.value.titulo as string,
      descricao: this.publicacaoForm.value.descricao as string,
      imagemURL: this.publicacaoForm.value.imagemURL as string,
      usuarioId: this.authUserService.getUserFromStorage()?.id as string,
      enderecoId: this.publicacaoForm.value.rua as string,
      publicoAlvo: this.publicacaoForm.value.publicoAlvo as string,
      hashtags: parseHashtags(this.publicacaoForm.value.hashtags!),
    };

    this.publicacaoService.saveInformativo(informativo).subscribe(
      (response) => {},
      (err) => {
        console.log('Não foi possível cadastrar informativo!', err);
      },
    );
  }
}
