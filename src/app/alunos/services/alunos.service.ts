import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../model/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly apiUrl = 'api/aluno';

  constructor(private httpClient: HttpClient) { }

  public requisitarAlunos(): Observable<Aluno[]>{
    return this.httpClient.get<Aluno[]>(this.apiUrl)
  }

   public adicionarAluno(aluno: Aluno): Observable<Aluno>{
    return this.httpClient.post<Aluno>("(this.apiUrl", aluno);
  }

}
