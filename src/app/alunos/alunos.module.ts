import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos/alunos.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlunosComponent,
    AlunoFormComponent
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class AlunosModule { }
