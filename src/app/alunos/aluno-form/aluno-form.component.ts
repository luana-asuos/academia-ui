import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../services/alunos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aluno } from '../model/aluno';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {
  form: FormGroup;
  alunoId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: AlunosService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nome: [null],
      dataNascimento: [null],
      telefone: [null],
      email: [null],
      rg: [null],
      cpf: [null],
      dataVencimento: [null]
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ aluno }) => {
      if (aluno) {
        this.alunoId = aluno.id;
        this.form.patchValue(aluno);
      }
    });
  }

  loadAlunoData(): void {
    if (this.alunoId) {
      this.service.loadById(this.alunoId).subscribe({
        next: (aluno: Aluno) => {
          this.form.patchValue(aluno);
        },
        error: (error) => {
          console.error('Erro ao carregar os dados do aluno', error);
          this.snackBar.open('Erro ao carregar os dados do aluno.', '', { duration: 5000 });
        }
      });
    } else {
      console.error('ID do aluno não está disponível');
      this.snackBar.open('ID do aluno não está disponível.', '', { duration: 5000 });
    }
  }

  onSubmit(): void {
    if (this.alunoId) {
      this.service.editarAluno({ id: this.alunoId, ...this.form.value }).subscribe({
        next: () => {
          this.snackBar.open('Aluno atualizado com sucesso!', '', { duration: 5000 });
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Erro ao atualizar aluno', error);
          this.snackBar.open('Erro ao salvar aluno.', '', { duration: 5000 });
        }
      });
    } else {
      this.service.adicionarAluno(this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Aluno adicionado com sucesso!', '', { duration: 5000 });
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Erro ao salvar aluno', error);
          this.snackBar.open('Erro ao salvar aluno.', '', { duration: 5000 });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
