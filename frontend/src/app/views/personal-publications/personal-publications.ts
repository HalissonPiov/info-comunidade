import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, startWith, Subject, switchMap } from 'rxjs';

import { PublicacaoFormComponent } from '../../components/publicacao/publicacao-form-component/publicacao-form-component';
import { User } from '../../models/User';
import { AuthUserService } from '../../services/auth-user-service';
import { PublicacaoService } from '../../services/publicacao-service';
import { ordenarPorDataDesc } from '../../services/utils-service';
import { SharedModule } from '../../shared/shared-module';
import { Publicacao } from '../../models/Publicacao';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-personal-publications',
  imports: [SharedModule],
  templateUrl: './personal-publications.html',
  styleUrl: './personal-publications.css',
})
export class PersonalPublications {
  public PUBLICACAO_DATA: Publicacao[] = [];

  private publicacaoService = inject(PublicacaoService);
  private authService = inject(AuthUserService);
  readonly dialog = inject(MatDialog);

  realoadPublications$ = new Subject<void>();
  publications$ = this.realoadPublications$.pipe(
    startWith(null),
    switchMap(() => {
      const user: User | null = this.authService.getUserFromStorage();
      return this.publicacaoService.findAllByUserId(user?.id!).pipe(
        map((response) => ordenarPorDataDesc(response)),
        catchError((err) => {
          console.log('Erro ao carregar publicações!', err);
          return [];
        }),
      );
    }),
  );

  openCreatePublicacaoDialog(): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { isCreating: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.realoadPublications$.next();
      }
    });
  }
}
