import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AlunoComponent } from './aluno/aluno.component';
import { AulaComponent } from './aula/aula.component';
import { AreaComponent } from './area/area.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { GestorComponent } from './gestor/gestor.component';
import { RespostaComponent } from './resposta/resposta.component';
import { TrilhaComponent } from './trilha/trilha.component';
import { TurmaComponent } from './turma/turma.component';
import { PerguntaComponent } from './pergunta/pergunta.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    AreaComponent,
    AulaComponent,
    AvaliacaoComponent,
    DisciplinaComponent,
    GestorComponent,
    PerguntaComponent,
    RespostaComponent,
    TrilhaComponent,
    TurmaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
