import { Component, inject, OnInit, Signal } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Publicacao } from '../../models/Publicacao';
import { PublicacaoService } from '../../services/publicacao-service';
import { AuthUserService } from '../../services/auth-user-service';
import { User } from '../../models/User';
import { MatDialog } from '@angular/material/dialog';
import { PublicacaoFormComponent } from '../../components/publicacao/publicacao-form-component/publicacao-form-component';

@Component({
  selector: 'app-personal-publications',
  imports: [SharedModule],
  templateUrl: './personal-publications.html',
  styleUrl: './personal-publications.css',
})
export class PersonalPublications implements OnInit {
  public PUBLICACAO_DATA: Publicacao[] = [];
  publicacaoService: PublicacaoService = inject(PublicacaoService);
  private authService = inject(AuthUserService);
  readonly dialog = inject(MatDialog);

  user: User | null = this.authService.getUserFromStorage();

  ngOnInit(): void {
    this.findPersonalPublications();
  }

  findPersonalPublications() {
    this.publicacaoService.findAllByUserId(this.user?.id!).subscribe(
      (response) => {
        this.PUBLICACAO_DATA = response;
      },
      (err) => {
        console.log('Não foi possível buscar as publicações por ID: ' + err);
      },
    );
  }

  openCreatePublicacaoDialog(): void {
    const dialogRef = this.dialog.open(PublicacaoFormComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: {isCreating: true},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.findPersonalPublications();
    });
  }
}
