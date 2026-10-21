export interface Cadastro {

    id: number;
    nome: string;
    email: string;
    telefone: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
}

export type NovoCadastro = Omit<Cadastro, 'id'>; //irá omitir o id pois será auto increment