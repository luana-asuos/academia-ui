import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

import { Aluno } from '../model/aluno';
import { AlunosService } from '../services/alunos.service';

export const alunoResolver: ResolveFn<Aluno> = (
  route,
  state,
  service: AlunosService = inject(AlunosService)
) => {
  if (route.params?.['id']) {
    console.log('ID recebido no resolver:', route.params['id']);
    return service.loadById(route.params['id']);
  }

  return of({
    id: '',
    nome: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    rg: '',
    cpf: '',
    dataVencimento: '',
    enderecoModel: {
      rua: '',
      numero: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: ''
    }
  });
};
