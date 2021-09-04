import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { TrilhaComponent } from './trilha/trilha.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    AvaliacaoComponent,
    TrilhaComponent,
    DisciplinaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
