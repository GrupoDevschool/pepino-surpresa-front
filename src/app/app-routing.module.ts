import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlunoComponent } from "./aluno/aluno.component";
import { AreaComponent } from "./area/area.component";
import { AvaliacaoComponent } from "./avaliacao/avaliacao.component";
import { DisciplinaComponent } from "./disciplina/disciplina.component";
import { TrilhaComponent } from "./trilha/trilha.component";

const routes: Routes = [
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunoComponent },
  { path: 'avaliacoes', component: AvaliacaoComponent },
  { path: 'trilhas', component: TrilhaComponent },
  { path: 'disciplinas', component: DisciplinaComponent },
  { path: 'areas', component: AreaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
