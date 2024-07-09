import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosComponent } from './alunos/alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

const routes: Routes = [
  { path: '', component: AlunosComponent},
  { path: 'new', component: AlunoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
