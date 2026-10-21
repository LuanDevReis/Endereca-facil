import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListaCadastroComponent } from './pages/lista-cadastro/lista-cadastro.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:'cadastro', component: CadastroComponent},
  {path: 'cadastros', component: ListaCadastroComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
