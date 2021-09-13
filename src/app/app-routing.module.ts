import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlunoComponent } from "./aluno/aluno.component";
import { AulaComponent } from "./aula/aula.component";
import { AreaComponent } from "./area/area.component";
import { AvaliacaoComponent } from "./avaliacao/avaliacao.component";
import { DisciplinaComponent } from "./disciplina/disciplina.component";
import { GestorComponent } from "./gestor/gestor.component";
import { RespostaComponent } from "./resposta/resposta.component";
import { TrilhaComponent } from "./trilha/trilha.component";
import { TurmaComponent } from "./turma/turma.component";

const routes: Routes = [
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunoComponent },
  { path: 'areas', component: AreaComponent },
  { path: 'aulas', component: AulaComponent},
  { path: 'avaliacoes', component: AvaliacaoComponent },
  { path: 'disciplinas', component: DisciplinaComponent },
  { path: 'gestores', component: GestorComponent },
  { path: 'respostas', component: RespostaComponent },
  { path: 'trilhas', component: TrilhaComponent },
  { path: 'turmas', component: TurmaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
