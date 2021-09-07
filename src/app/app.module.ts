import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { TrilhaComponent } from './trilha/trilha.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceEditComponent } from './disciplina/service-edit/service-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    AvaliacaoComponent,
    TrilhaComponent,
    DisciplinaComponent,
    ServiceEditComponent,
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
