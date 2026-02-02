import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter, Observable, switchMap } from 'rxjs';

import { Endereco } from '../../../models/Endereco';
import { Informativo } from '../../../models/Informativo';
import { AuthUserService } from '../../../services/auth-user-service';
import { EnderecoService } from '../../../services/endereco-service';
import { parseHashtags } from '../../../services/utils-service';
import { SharedModule } from '../../../shared/shared-module';
import { Ocorrencia } from './../../../models/Ocorrencia';
import { PublicacaoService } from './../../../services/publicacao-service';
import { Publicacao } from '../../../models/Publicacao';

@Component({
  selector: 'app-publicacao-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, MatDialogModule],
  templateUrl: './publicacao-form-component.html',
  styleUrl: './publicacao-form-component.css',
})
export class PublicacaoFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PublicacaoFormComponent>);
  private formBuilder = inject(FormBuilder);
  readonly data = inject<{ publicacao?: Publicacao; isCreating: boolean }>(MAT_DIALOG_DATA);

  private enderecoService = inject(EnderecoService);
  private authUserService: AuthUserService = inject(AuthUserService);
  private publicacaoService: PublicacaoService = inject(PublicacaoService);

  public ENDERECO_DATA: Endereco[] = [];
  public BAIRROS_UNICOS: string[] = [];
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

    if (this.data?.publicacao) {
      this.onUpdateSubmit(this.data.publicacao);
    }
  }

  getEnderecos() {
    this.enderecoService.findAll().subscribe(
      (response) => {
        this.ENDERECO_DATA = response;
        const bairrosSet = new Set(response.map((endereco: Endereco) => endereco.bairro));
        this.BAIRROS_UNICOS = Array.from(bairrosSet).sort() as string[];
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
    if (tipo && tipo === 'OCORRENCIA' && this.data.isCreating) {
      this.saveOcorrecia();
    }
    if (tipo && tipo === 'INFORMATIVO' && this.data.isCreating) {
      this.saveInformativo();
    }
    if (tipo && tipo === 'INFORMATIVO') {
      this.updateInformativo();
    }
    if (tipo && tipo === 'OCORRENCIA') {
      this.updateOcorrencia();
    }
    this.dialogRef.close(true);
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

  updateInformativo() {
    const publicacaoId = this.data?.publicacao?.idPublicacao;

    const informativo: Informativo = {
      titulo: this.publicacaoForm.value.titulo as string,
      descricao: this.publicacaoForm.value.descricao as string,
      imagemURL: this.publicacaoForm.value.imagemURL as string,
      usuarioId: this.authUserService.getUserFromStorage()?.id as string,
      enderecoId: this.publicacaoForm.value.rua as string,
      publicoAlvo: this.publicacaoForm.value.publicoAlvo as string,
      hashtags: parseHashtags(this.publicacaoForm.value.hashtags!),
    };

    this.publicacaoService.updateInformativo(publicacaoId!, informativo).subscribe(
      (response) => {},
      (err) => {
        console.log('Não foi possível cadastrar informativo!', err);
      },
    );
  }

  updateOcorrencia() {
    const publicacaoId = this.data?.publicacao?.idPublicacao;

    const ocorrencia: Ocorrencia = {
      titulo: this.publicacaoForm.value.titulo as string,
      descricao: this.publicacaoForm.value.descricao as string,
      imagemURL: this.publicacaoForm.value.imagemURL as string,
      usuarioId: this.authUserService.getUserFromStorage()?.id as string,
      enderecoId: this.publicacaoForm.value.rua as string,
      setor: this.publicacaoForm.value.setor as string,
      hashtags: parseHashtags(this.publicacaoForm.value.hashtags!),
    };

    this.publicacaoService.updateOcorrencia(publicacaoId!, ocorrencia).subscribe(
      (response) => {},
      (err) => {
        console.log('Não foi possível cadastrar ocorrência!', err);
      },
    );
  }

  onUpdateSubmit(data: Publicacao) {
    const id = this.authUserService.getUserFromStorage()?.id;
    if (!id) return;

    if (data?.usuario?.id !== id) return;

    // Preenche campos comuns
    this.publicacaoForm.patchValue({
      titulo: data.titulo,
      descricao: data.descricao,
      hashtags: data.hashtags?.join(', '),
      imagemURL: data.imagemURL,
      rua: data.endereco?.idEndereco ?? '',
    });

    // Define o tipo com base nos campos existentes
    if (data.setor) {
      this.publicacaoForm.patchValue({
        tipo: 'OCORRENCIA',
        setor: data.setor,
        publicoAlvo: '',
      });
    }

    if (data.publicoAlvo) {
      this.publicacaoForm.patchValue({
        tipo: 'INFORMATIVO',
        publicoAlvo: data.publicoAlvo,
        setor: '',
      });
    }
  }
}
