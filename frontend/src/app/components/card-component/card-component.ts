import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { catchError, of, startWith, Subject, switchMap } from 'rxjs';

import { ComentarioDTO } from '../../models/ComentarioDTO';
import { Publicacao } from '../../models/Publicacao';
import { User } from '../../models/User';
import { AuthUserService } from '../../services/auth-user-service';
import { ComentarioService } from '../../services/comentario-service';
import { PublicacaoDeleteDialog } from '../publicacao/publicacao-delete-dialog/publicacao-delete-dialog';
import { PublicacaoFormComponent } from '../publicacao/publicacao-form-component/publicacao-form-component';
import { Comentario } from './../../models/Comentario';

@Component({
  selector: 'app-card-component',
  standalone: true,
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    MatDialogModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class CardComponent implements OnChanges {
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
  user: User | null = this.authUserService.getUserFromStorage();

  editingComment: string = '';
  editedText = new FormControl('', Validators.required);

  private reloadComments$ = new Subject<void>();

  comments$ = this.reloadComments$.pipe(
    startWith(null),
    switchMap(() =>
      this.comentarioService.findCommentsByPublicacaoId(this.publicacao.idPublicacao),
    ),
    catchError((err) => {
      console.error('Erro ao buscar comentários', err);
      return of([]);
    }),
  );

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadComments$.next();
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

    this.comentarioService.createComment(comment).subscribe({
      next: () => {
        this.text.reset();
        this.reloadComments$.next();
      },
      error: (err) => {
        console.error('Erro ao criar comentário', err);
      },
    });
  }

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

    this.comentarioService.updateComment(id, commentDTO).subscribe({
      next: () => {
        this.cancelEdit();
        this.reloadComments$.next();
      },
      error: (err) => {
        console.log('Erro ao atualizar comentário!', err);
      },
    });
  }

  cancelEdit() {
    this.editingComment = '';
    this.editedText.setValue('');
  }

  deleteComment(id: string) {
    this.comentarioService.deleteComment(id).subscribe({
      next: () => {
        this.reloadComments$.next();
      },
      error: (err) => console.log('Erro ao deletar comentário!', err),
    });
  }
}
