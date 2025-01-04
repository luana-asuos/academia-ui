import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../services/alunos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aluno } from '../model/aluno'; // Importando o modelo de aluno

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {

  form: FormGroup;

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

  ngOnInit(): void {}

  onSubmit() {
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
        estado: this.form.value.enderecoModel.estado
      }
    };
    this.service.adicionarAluno(this.form.value)
      .subscribe(
        (result: Aluno) => {

          this.snackBar.open('Aluno salvo com sucesso!', '', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Erro ao salvar aluno.', '', { duration: 5000 });
        }
      );
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
