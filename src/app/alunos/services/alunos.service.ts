import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Aluno } from '../model/aluno';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly apiUrl = 'api/aluno';
  private alunosSubject = new BehaviorSubject<Aluno[]>([]); // Usando BehaviorSubject
  public alunos$ = this.alunosSubject.asObservable(); // Observable para se inscrever

  constructor(private httpClient: HttpClient) {}

  // Método para obter a lista de alunos
  public requisitarAlunos(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(this.apiUrl).pipe(
      tap((alunos: Aluno[]) => {
        this.alunosSubject.next(alunos); // Atualiza o BehaviorSubject com a lista de alunos
      })
    );
  }

  public adicionarAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.apiUrl, aluno).pipe(
      tap((alunoCriado: Aluno) => {
        // Após a criação do aluno, atualiza a lista de alunos no BehaviorSubject
        const alunosAtualizados = [...this.alunosSubject.value, alunoCriado];
        this.alunosSubject.next(alunosAtualizados);
      })
    );
  }
}
