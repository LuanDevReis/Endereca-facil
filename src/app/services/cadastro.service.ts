import { Injectable } from '@angular/core';
import { Cadastro, NovoCadastro } from '../models/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly cadastros: Cadastro[] = [];
  private proximoId = 1;

  adicionar(novoCadastro: NovoCadastro): void {
    this.cadastros.push({...novoCadastro, id: this.proximoId++})
  }

  listar(): Cadastro[] {
    return [...this.cadastros]; 

  }
}
