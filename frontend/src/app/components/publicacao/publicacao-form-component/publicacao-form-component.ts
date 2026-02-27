import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';

import { Endereco } from '../../../models/Endereco';
import { Informativo } from '../../../models/Informativo';
import { Publicacao } from '../../../models/Publicacao';
import { AuthUserService } from '../../../services/auth-user-service';
import { EnderecoService } from '../../../services/endereco-service';
import { parseHashtags } from '../../../services/utils-service';
import { SharedModule } from '../../../shared/shared-module';
import { Ocorrencia } from './../../../models/Ocorrencia';
import { PublicacaoService } from './../../../services/publicacao-service';

@Component({
  selector: 'app-publicacao-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, MatDialogModule],
  templateUrl: './publicacao-form-component.html',
  styleUrl: './publicacao-form-component.css',
})
export class PublicacaoFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PublicacaoFormComponent>);
  readonly data = inject<{ publicacao?: Publicacao; isCreating: boolean }>(MAT_DIALOG_DATA);

  private formBuilder = inject(FormBuilder);
  private enderecoService = inject(EnderecoService);
  private authUserService = inject(AuthUserService);
  private publicacaoService = inject(PublicacaoService);

  public ENDERECO_DATA: Endereco[] = [];
  public BAIRROS_UNICOS: string[] = [];

  public publicacaoForm = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.maxLength(30)]],
    descricao: ['', [Validators.required, Validators.maxLength(350)]],
    hashtags: [''],
    rua: ['', Validators.required],
    bairro: ['', Validators.required],
    tipo: ['', Validators.required],
    imagemURL: [''],
    setor: [''],
    publicoAlvo: [''],
  });

  public ENDERECO_POR_BAIRRO_DATA = this.publicacaoForm?.get('bairro')?.valueChanges.pipe(
    filter((bairro) => !!bairro),
    switchMap((bairro) => this.enderecoService.findByBairro(bairro!)),
  );

  ngOnInit() {
    this.loadEnderecos();
    this.listenTipoChanges();

    if (this.data?.publicacao) {
      this.patchForm(this.data.publicacao);
    }
  }

  private listenTipoChanges() {
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

  loadEnderecos() {
    this.enderecoService.findAll().subscribe({
      next: (response) => {
        this.ENDERECO_DATA = response;
        const bairrosSet = new Set(response.map((endereco: Endereco) => endereco.bairro));
        this.BAIRROS_UNICOS = Array.from(bairrosSet).sort() as string[];
      },
      error: (err) => {
        console.log('Erro ao buscar endereços!', err);
      },
    });
  }

  private buildBasePublicacao() {
    const form = this.publicacaoForm.value;

    return {
      titulo: form.titulo!,
      descricao: form.descricao!,
      imagemURL: form.imagemURL!,
      usuarioId: this.authUserService.getUserFromStorage()?.id!,
      enderecoId: form.rua!,
      hashtags: parseHashtags(form.hashtags ?? ''),
    };
  }

  onFormSubmit() {
    if (this.publicacaoForm.invalid) return;

    const tipo = this.publicacaoForm.value.tipo;

    if (tipo === 'OCORRENCIA') {
      this.handleOcorrencia();
    }

    if (tipo === 'INFORMATIVO') {
      this.handleInformativo();
    }
  }

  private handleOcorrencia() {
    const ocorrencia: Ocorrencia = {
      ...this.buildBasePublicacao(),
      setor: this.publicacaoForm.value.setor!,
    };

    if (this.data.isCreating) {
      this.publicacaoService.saveOcorrencia(ocorrencia).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.log('Erro ao salvar ocorrência', err),
      });
    } else {
      const id = this.data.publicacao?.idPublicacao!;

      this.publicacaoService.updateOcorrencia(id, ocorrencia).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.log('Erro ao atualizar ocorrência', err),
      });
    }
  }

  private handleInformativo() {
    const informativo: Informativo = {
      ...this.buildBasePublicacao(),
      publicoAlvo: this.publicacaoForm.value.publicoAlvo!,
    };

    if (this.data.isCreating) {
      this.publicacaoService.saveInformativo(informativo).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.log('Erro ao salvar informativo', err),
      });
    } else {
      const id = this.data.publicacao?.idPublicacao!;

      this.publicacaoService.updateInformativo(id, informativo).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.log('Erro ao atualizar informativo', err),
      });
    }
  }

  private patchForm(data: Publicacao) {
    const id = this.authUserService.getUserFromStorage()?.id;

    if (!id || data.usuario?.id !== id) return;

    this.publicacaoForm.patchValue({
      titulo: data.titulo,
      descricao: data.descricao,
      hashtags: data.hashtags?.join(', '),
      imagemURL: data.imagemURL,
      rua: data.endereco?.idEndereco ?? '',
    });

    if (data.setor) {
      this.publicacaoForm.patchValue({
        tipo: 'OCORRENCIA',
        setor: data.setor,
      });
    }

    if (data.publicoAlvo) {
      this.publicacaoForm.patchValue({
        tipo: 'INFORMATIVO',
        publicoAlvo: data.publicoAlvo,
      });
    }
  }
}
