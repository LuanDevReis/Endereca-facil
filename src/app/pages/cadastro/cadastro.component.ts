import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NovoCadastro } from 'src/app/models/cadastro';
import { CadastroService } from 'src/app/services/cadastro.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  cadastro: NovoCadastro = {
     nome: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  };

  consultandoCep = false;
  mensagemCep = '';

  constructor(private cepservice: CepService,
              private cadastroService: CadastroService,
              private router: Router
  ) {}

  limparEndereco(): void {
    this.cadastro.logradouro = '';
    this.cadastro.bairro = '';
    this.cadastro.cidade = '';
    this.cadastro.uf = '';
    this.mensagemCep = '';
  }

  consultarCep(): void {
    if (this.consultandoCep) return;

    const cep = this.cadastro.cep.replace(/\D/g, '');

    if (cep.length !== 8) {
      this.mensagemCep = 'Informe um CEP com 8 dígitos.';
      return;
    }

    this.consultandoCep = true;
    this.mensagemCep = 'Consultando CEP...';

    this.cepservice.consultarCep(cep).subscribe({

      next: (endereco) => {
        this.consultandoCep = false;

        if(endereco.erro){
          this.limparEndereco();
          this.mensagemCep = 'CEP não encontrado. COnfigura os números informados'
        }

        this.cadastro.cep = cep;
        this.cadastro.logradouro = endereco.logradouro || '';
        this.cadastro.bairro = endereco.bairro ||  '';
        this.cadastro.cidade = endereco.localidade || '';
        this.cadastro.uf = endereco.uf || '';
        this.mensagemCep = 'Endereço encontrado. complete o número e revise os dados.'

      },

      error: () => {
        this.consultandoCep = false;
        this.limparEndereco();
        this.mensagemCep = 'Não foi possível consultar o CEP . Tente novamente.'
      }

    });
  }

  salvar(formulario: NgForm): void {
    if(formulario.invalid){
      formulario.control.markAllAsTouched();
      return;
    }

    this.cadastro.cep = this.cadastro.cep.replace(/\D/g, '');
    this.cadastroService.adicionar(this.cadastro);
    this.router.navigate(['/cadastros']);
  }

}
