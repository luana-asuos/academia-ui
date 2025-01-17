import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosComponent } from './alunos/alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { alunoResolver } from './resolver/aluno.resolver';

const routes: Routes = [
  { path: '', component: AlunosComponent },
  { path: 'new', component: AlunoFormComponent, resolve: { aluno: alunoResolver } },
  { path: 'edit/:id', component: AlunoFormComponent, resolve: { aluno: alunoResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
