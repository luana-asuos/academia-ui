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

  /* public enviarDados(): void{
    let aluno: Aluno = new Aluno();
    aluno.nome = "Teste";
    aluno.dataNascimento = "15/10/2024";
    aluno.telefone = "45895623";
    aluno.email = "luana@luana";
    aluno.rg = "xx.xxx.xxx-x";
    aluno.cpf = "425.192.738-95";
    aluno.dataNascimento = "15/10/2001";
    this.alunosService.adicionarAluno(aluno).subscribe({
      next: (res: Aluno) => {
        console.log("Aluno adicionado!");
        console.log(res);
      },
      error: (err:any) => {
        console.log("Erro ao adicionar aluno");
        console.log(err);
      }
    });
  } */
}
