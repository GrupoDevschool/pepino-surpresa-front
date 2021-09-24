import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';
import { AlunoComponent } from './aluno/aluno.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaComponent } from './area/area.component';
import { AulaComponent } from './aula/aula.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { GestorComponent } from './gestor/gestor.component';
import { PerguntaComponent } from './pergunta/pergunta.component';
import { PresencaComponent } from './presenca/presenca.component';
import { QuestaoComponent } from './questao/questao.component';
import { RespostaComponent } from './resposta/resposta.component';
import { TableLoadingMessageComponent } from './shared/component/table-loading-message/table-loading-message.component';
import { TrilhaComponent } from './trilha/trilha.component';
import { TurmaComponent } from './turma/turma.component';
import { AvaliacaoDetalhesComponent } from './avaliacao/avaliacao-detalhes/avaliacao-detalhes.component';



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
    PresencaComponent,
    QuestaoComponent,
    TableLoadingMessageComponent,
    AvaliacaoDetalhesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
