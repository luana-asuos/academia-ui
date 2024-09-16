import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.css'
})
export class AlunoFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
    console.log();
  }

  onCancel(){
    this.router.navigate([''], {relativeTo: this.route});
  }

}
