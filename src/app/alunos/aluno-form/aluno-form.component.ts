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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: AlunosService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nome: [null],
      nome: [null],
      dataNascimento: [null],
      telefone: [null],
      email: [null],
      rg: [null],
      cpf: [null],
      dataVencimento: [null],
      enderecoModel: this.formBuilder.group({
        rua: [null],
        numero: [null],
        bairro: [null],
        cep: [null],
        cidade: [null],
        estado: [null]
      })
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
    const aluno = {
      nome: this.form.value.nome,
      dataNascimento: this.form.value.dataNascimento,
      telefone: this.form.value.telefone,
      email: this.form.value.email,
      rg: this.form.value.rg,
      cpf: this.form.value.cpf,
      dataVencimento: this.form.value.dataVencimento,
      enderecoModel: {
        rua: this.form.value.enderecoModel.rua,
        numero: this.form.value.enderecoModel.numero,
        bairro: this.form.value.enderecoModel.bairro,
        cep: this.form.value.enderecoModel.cep,
        cidade: this.form.value.enderecoModel.cidade,
        estado: this.form.value.enderecoModel.estado,
      },
    };

    if (this.alunoId) {
      // Editar aluno existente
      this.service.editarAluno({ id: this.alunoId, ...this.form.value }).subscribe({
        next: () => {
          this.snackBar.open('Aluno atualizado com sucesso!', '', { duration: 5000 });
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Erro ao atualizar aluno', error);
          this.snackBar.open('Erro ao salvar aluno.', '', { duration: 5000 });
        },
      });
    } else {
      // Adicionar novo aluno
      this.service.adicionarAluno(aluno).subscribe({
        next: () => {
          this.snackBar.open('Aluno adicionado com sucesso!', '', { duration: 5000 });
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Erro ao salvar aluno', error);
          this.snackBar.open('Erro ao salvar aluno.', '', { duration: 5000 });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
