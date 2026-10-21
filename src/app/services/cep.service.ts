import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoviaCep } from '../models/endereco-via-cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  consultarCep(cep: string) : Observable<EnderecoviaCep>{
    const cepSomenteNumeros = cep.replace(/\D/g, '');
    return this.http.get<EnderecoviaCep>(`https://viacep.com.br/ws/${cepSomenteNumeros}/json/`);

  }
}
