export class Aluno {

  nome: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  rg: string;
  cpf: string;
  dataVencimento: string;

  public constructor(){
    this.nome = 'Luana';
    this.dataNascimento = '15/08/2005';
    this.telefone = '89565656';
    this.email = 'luana@luana';
    this.rg = '46.483.422-3';
    this.cpf = '882.983.520-09';
    this.dataVencimento = '22/02/2024'
  }
}
