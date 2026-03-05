import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  private router = inject(Router);

  breadcrumb = '';

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });

    this.updateBreadcrumb();
  }

  updateBreadcrumb() {
    const url = this.router.url;

    const routeMap: any = {
      '/home': 'Início',
      '/personal-publications': 'Minhas Publicações',
      '/edit-profile': 'Editar perfil'
    };

    this.breadcrumb = routeMap[url] ?? '';
  }


  logout() {
    this.router.navigate(['/login'])
  }

}
