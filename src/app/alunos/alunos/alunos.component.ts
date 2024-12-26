import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../services/alunos.service';
import { Aluno } from '../model/aluno';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public lista: Aluno[] = [];
  readonly displayedColumns = ['nome', 'dataVencimento', 'email', 'dataNascimento', 'telefone', 'rg', 'cpf', 'rua', 'numero', 'bairro', 'cep', 'cidade', 'estado', 'actions'];

  constructor(
    private alunosService: AlunosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.alunosService.alunos$.subscribe((alunos: Aluno[]) => {
      this.lista = alunos;
    });

    this.alunosService.requisitarAlunos().subscribe();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
