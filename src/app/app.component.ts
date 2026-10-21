import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  menuAberto = false;
  tituloPagina = 'Início';
  private readonly navegacaoSubscription: Subscription;

  constructor(private router: Router) {
    this.navegacaoSubscription = this.router.events
      .pipe(filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd))
      .subscribe((evento) => {
        this.tituloPagina = this.obterTitulo(evento.urlAfterRedirects);
        this.menuAberto = false;
      });
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  ngOnDestroy(): void {
    this.navegacaoSubscription.unsubscribe();
  }

  private obterTitulo(url: string): string {
    if (url.startsWith('/cadastro')) {
      return 'Novo cadastro';
    }
    if (url.startsWith('/cadastros')) {
      return 'Cadastros realizados';
    }
    return 'Início';
  }
 
}
