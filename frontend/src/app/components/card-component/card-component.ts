import { ComentarioDTO } from '../../models/ComentarioDTO';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Publicacao } from '../../models/Publicacao';
import { PublicacaoFormComponent } from '../publicacao/publicacao-form-component/publicacao-form-component';
import { PublicacaoDeleteDialog } from '../publicacao/publicacao-delete-dialog/publicacao-delete-dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthUserService } from '../../services/auth-user-service';
import { ComentarioService } from '../../services/comentario-service';
import { Comentario } from '../../models/Comentario';
import { User } from '../../models/User';

@Component({
  selector: 'app-card-component',
  standalone: true,
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
  imports: [MatCardModule, MatButtonModule, DatePipe, MatDialogModule, ReactiveFormsModule],
})
export class CardComponent implements OnInit {
  @Input() publicacao!: Publicacao;
  @Input() showOptions: boolean = false;
  @Input() nomeUsuario: string = '';
  @Input() nomeCompleto: string = '';
  @Input() date: string = '';

  @Output() updated = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  readonly dialog = inject(MatDialog);
  private authUserService = inject(AuthUserService);
  private comentarioService = inject(ComentarioService);

  text = new FormControl('', Validators.required);
  comments?: Comentario[];
  user: User | null = this.authUserService.getUserFromStorage();

  ngOnInit(): void {
    this.findCommentsByPublicacao();
  }

  findCommentsByPublicacao() {
    this.comentarioService.findCommentsByPublicacaoId(this.publicacao.idPublicacao).subscribe(
      (response) => {
        this.comments = response;
      },
      (err) => {
        console.log('Erro ao buscar comentários!', err);
      },
    );
  }

  openUpdatePublicacaoDialog(publicacao: Publicacao): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { publicacao: publicacao, isCreating: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.updated.emit();
      }
    });
  }

  openDeletePublicacaoDialog(publicacao: Publicacao): void {
    const dialogRef = this.dialog.open(PublicacaoDeleteDialog, {
      width: '300px',
      data: { publicacao },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleted.emit();
      }
    });
  }

  createComment(idPublicacao: string) {
    const userId = this.authUserService.getUserFromStorage()?.id;

    if (!this.text.valid) return;

    const comment: ComentarioDTO = {
      texto: this.text.value!,
      usuarioID: userId!,
      publicacaoID: idPublicacao,
      excluido: false,
    };

    this.comentarioService.createComment(comment).subscribe(
      (response) => {
        this.text.reset();
        this.findCommentsByPublicacao();
      },
      (err) => {
        console.log('Erro ao criar comentário!', err);
      },
    );
  }

  editingComment: string = '';
  editedText = new FormControl('', Validators.required);

  startEdit(comment: Comentario) {
    this.editingComment = comment.id;
    this.editedText.setValue(comment.texto);
  }

  saveEdit(id: string, idPublicacao: string) {
    const userId = this.authUserService.getUserFromStorage()?.id;

    if (!this.editedText.valid) return;

    const commentDTO: ComentarioDTO = {
      texto: this.editedText.value!,
      usuarioID: userId!,
      publicacaoID: idPublicacao,
      excluido: false,
    };

    this.comentarioService.updateComment(id, commentDTO).subscribe(
      (response) => {
        this.cancelEdit();
        this.findCommentsByPublicacao();
      },
      (err) => {
        console.log('Erro ao atualizar comentário!', err);
      },
    );
  }

  cancelEdit() {
    this.editingComment = '';
    this.editedText.setValue('');
  }

  deleteComment(id: string) {
    this.comentarioService.deleteComment(id).subscribe(
      (response) => {
        this.findCommentsByPublicacao();
      },
      (err) => console.log('Erro ao deletar comentário!', err),
    );
    this.comments = this.comments!.filter((c) => c.id !== id);
  }
}
