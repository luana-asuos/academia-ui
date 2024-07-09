import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.css'
})
export class AlunoFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  }

  onCancel(){

  }

}
