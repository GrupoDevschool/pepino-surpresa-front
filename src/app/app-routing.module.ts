import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlunoComponent } from "./aluno/aluno.component";
import { AvaliacaoComponent } from "./avaliacao/avaliacao.component";
import { DisciplinaComponent } from "./disciplina/disciplina.component";
import { TrilhaComponent } from "./trilha/trilha.component";

const routes: Routes = [
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunoComponent },
  { path: 'avaliacoes', component: AvaliacaoComponent },
  { path: 'trilhas', component: TrilhaComponent },
  { path: 'disciplinas', component: DisciplinaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
