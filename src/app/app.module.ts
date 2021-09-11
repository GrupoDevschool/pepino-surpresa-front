import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AlunoComponent } from './aluno/aluno.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TrilhaComponent } from './trilha/trilha.component';
import { AreaComponent } from './area/area.component';
import { RespostaComponent } from './resposta/resposta.component';


@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    AvaliacaoComponent,
    TrilhaComponent,
    DisciplinaComponent,
    AreaComponent,
    RespostaComponent,
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
