import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Aluno } from '../model/aluno';
import { tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  private readonly apiUrl = 'api/aluno';
  private alunosSubject = new BehaviorSubject<Aluno[]>([]); // Usando BehaviorSubject para armazenar alunos localmente
  public alunos$ = this.alunosSubject.asObservable(); // Observable para consumo externo

  constructor(private httpClient: HttpClient) {}

  // Requisitar a lista de alunos e atualizar o BehaviorSubject
  public requisitarAlunos(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(this.apiUrl).pipe(
      tap((alunos: Aluno[]) => {
        this.alunosSubject.next(alunos); // Atualiza o BehaviorSubject
      })
    );
  }

  // Adicionar um novo aluno e atualizar o BehaviorSubject
  public adicionarAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.apiUrl, aluno).pipe(
      tap((alunoCriado: Aluno) => {
        const alunosAtualizados = [...this.alunosSubject.value, alunoCriado];
        this.alunosSubject.next(alunosAtualizados); // Atualiza a lista local
      })
    );
  }

  // Deletar um aluno e atualizar o BehaviorSubject
  public deletarAluno(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      tap(() => {
        const alunosAtualizados = this.alunosSubject.value.filter((aluno) => aluno.id !== id);
        this.alunosSubject.next(alunosAtualizados); // Remove o aluno deletado da lista local
      })
    );
  }

  // Editar um aluno e atualizar o BehaviorSubject
  public editarAluno(record: Partial<Aluno>): Observable<Aluno> {
    return this.httpClient.put<Aluno>(`${this.apiUrl}/${record.id}`, record).pipe(
      first(),
      tap((alunoAtualizado: Aluno) => {
        const alunosAtualizados = this.alunosSubject.value.map((aluno) =>
          aluno.id === alunoAtualizado.id ? alunoAtualizado : aluno
        );
        this.alunosSubject.next(alunosAtualizados); // Atualiza o aluno na lista local
      })
    );
  }

  // Carregar um aluno pelo ID (para exibição ou edição)
  public loadById(id: string): Observable<Aluno> {
    return this.httpClient.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  /* Caso precise implementar paginação no futuro:
  public list(page = 0, pageSize = 10): Observable<AlunoPage> {
    return this.httpClient.get<AlunoPage>(this.apiUrl, { params: { page, pageSize } }).pipe(first());
  }
  */
}
