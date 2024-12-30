import { AlunosService } from './../services/alunos.service';
import { Component, OnInit } from '@angular/core';
import { Aluno } from '../model/aluno';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent implements OnInit{

  public lista: Aluno[];

  //alunos: Aluno[] = [];
  readonly displayedColumns = ['nome', 'dataVencimento', 'email', 'dataNascimento', 'telefone', 'rg', 'cpf', 'actions']

  //alunosService: AlunosService;

  constructor(
    private alunosService: AlunosService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.lista = [];
  }

  ngOnInit(): void {
    this.alunosService.requisitarAlunos().subscribe({
      next: (res: Aluno[]) => {
        console.log("Sucesso");
        console.log(res);
        this.lista = res;
      },
      error: (err: any) => {
        console.log("ERRO");
        console.log(err);
      }
    });
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDelete(id: string): void {
    if (confirm('Tem certeza que deseja deletar este aluno?')) {
      this.alunosService.deletarAluno(id).subscribe({
        next: () => {
          console.log(`Aluno com ID ${id} deletado com sucesso!`);
          this.lista = this.lista.filter(aluno => aluno.id !== id);
        },
        error: (err: any) => {
          console.error('Erro ao deletar aluno:', err);
        }
      });
    }
  }}
