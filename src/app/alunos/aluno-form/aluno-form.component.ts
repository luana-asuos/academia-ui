import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../services/alunos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.css'
})
export class AlunoFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private service: AlunosService, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      nome:  [null],
      dataNascimento: [null],
      telefone: [null],
      email: [null],
      rg: [null],
      cpf: [null],
      dataVencimento: [null]
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.service.adicionarAluno(this.form.value)
    .subscribe(result => console.log(result), error => {
      this.snackBar.open('Erro ao salvar aluno.', '', {duration: 5000});
    });

  }

  onCancel(){
    this.router.navigate([''], {relativeTo: this.route});
  }

}
