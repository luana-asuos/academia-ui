import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AlunosService } from '../services/alunos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { Aluno } from '../model/aluno';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  public lista: Aluno[];
  public dataSource: MatTableDataSource<Aluno>;

  @Output() delete = new EventEmitter<Aluno>();
  readonly displayedColumns = ['nome', 'dataVencimento', 'email', 'dataNascimento', 'telefone', 'rg', 'cpf', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private alunosService: AlunosService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.lista = [];
    this.dataSource = new MatTableDataSource(this.lista);
  }

  ngOnInit(): void {
    this.alunosService.requisitarAlunos().subscribe({
      next: (res: Aluno[]) => {
        this.lista = res;
        this.dataSource.data = this.lista;
      },
      error: (err: any) => {
        console.error('Erro ao requisitar alunos:', err);
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(aluno: Aluno): void {
    if (aluno && aluno.id) {
      this.router.navigate(['edit', aluno.id], { relativeTo: this.route });
    } else {
      console.error('Aluno não encontrado ou sem id');
    }
  }

  onDelete(aluno: Aluno): void {
    if (!confirm('Tem certeza que deseja deletar este aluno?')) return;

    this.alunosService.deletarAluno(aluno.id).pipe(
      catchError((error) => {
        console.error('Erro ao deletar aluno:', error);
        this.snackBar.open('Erro ao deletar aluno.', '', { duration: 5000 });
        alert('Aluno não deletado!');
        return of(null);
      })
    ).subscribe({
      next: () => {
        this.lista = this.lista.filter(a => a.id !== aluno.id);
        this.dataSource.data = [...this.lista];

        if (this.table) {
          this.table.renderRows();
        }

        this.cdr.detectChanges();
        this.snackBar.open('Aluno deletado com sucesso!', '', { duration: 5000 });
      },
      error: (err) => {
        console.error('Erro na subscrição:', err);
      }
    });
  }
}
