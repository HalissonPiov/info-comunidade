import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-publicacao-form-component',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './publicacao-form-component.html',
  styleUrl: './publicacao-form-component.css',
})
export class PublicacaoFormComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<PublicacaoFormComponent>);
  private formBuilder = inject(FormBuilder);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  public publicacaoForm = this.formBuilder.group({
    titulo: ['', Validators.required],
    descricao: ['', Validators.required],
    hashtags: [''],
    rua: [''],
    bairro: [''],
    complemento: [''],
    imagemURL: [''],
    setor: [''],
    publicoAlvo: [''],
  });

  ngOnInit() {
  this.publicacaoForm.get('tipo')?.valueChanges.subscribe(tipo => {
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

  onFormSubmit() {
    
  }
}
