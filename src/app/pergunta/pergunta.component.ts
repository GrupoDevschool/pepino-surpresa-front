import { Component, OnInit } from '@angular/core';
import { RespostaService } from '../core/resposta.service';
import { Disciplina } from '../shared/model/Disciplina';
import { Pergunta } from '../shared/model/Pergunta';
import { DisciplinaService } from './../core/disciplina.service';
import { PerguntaService } from './../core/pergunta.service';
import { Resposta } from './../shared/model/Resposta';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {

  perguntas: Pergunta[];
  pergunta: Pergunta = {} as Pergunta;
  updatedPergunta: Pergunta = {} as Pergunta;

  disciplinas: Disciplina[];
  respostas: Resposta[];

  possiveisRespostas: Resposta[] = [];

  modalIsVisible: boolean = false;

  constructor(
    private PerguntaService: PerguntaService,
    private RespostaService:RespostaService,
    private DisciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.PerguntaService.list().subscribe((perguntas) => {
      this.perguntas = perguntas;
    });

    this.DisciplinaService.list().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    });
  }

  getRespostaByDisciplinaId(id: number) {
    this.RespostaService.listByDisciplina(id).subscribe((respostas) => {
      this.respostas = respostas;
    });
  }

  changeSelect(type: string) {
    switch(type) {
      case "disciplina":
        this.getRespostaByDisciplinaId(this.pergunta.disciplina.id);

        this.pergunta.respostas = [];

        break;
      case "resposta":
        const respostas = [];

        this.possiveisRespostas = respostas;
        break;
    }
  }

  save() {
    this.PerguntaService.save(this.pergunta).subscribe(
      pergunta => this.perguntas.push(pergunta),
      error => console.log(error)
    )
  }

  delete(id: number) {
    this.PerguntaService.delete(id).subscribe(() => {
          this.perguntas = this.perguntas.filter((element) => element.id !== id)
      }
    )
  }
}
