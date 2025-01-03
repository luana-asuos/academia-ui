import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Aluno } from '../model/aluno';
/*import { AlunoPage } from '../model/aluno-page';*/

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly apiUrl = 'api/aluno';

  constructor(private httpClient: HttpClient) { }

  public requisitarAlunos(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(this.apiUrl);
  }

  public adicionarAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.apiUrl, aluno);
  }

  public deletarAluno(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  public editarAluno(record: Partial<Aluno>): Observable<Aluno> {
    return this.httpClient.put<Aluno>(`${this.apiUrl}/${record.id}`, record).pipe(first());
  }

  /*public list(page = 0, pageSize = 10): Observable<AlunoPage> {
    return this.httpClient.get<AlunoPage>(this.apiUrl, { params: { page, pageSize } }).pipe(first());
  }*/

  public loadById(id: string): Observable<Aluno> {
    return this.httpClient.get<Aluno>(`${this.apiUrl}/${id}`);
  }
}
