import { Component, OnInit } from '@angular/core';
import { AreaService } from '../core/area.service';
import { RespostaService } from '../core/resposta.service';
import { Area } from '../shared/model/Area';
import { Pergunta } from '../shared/model/Pergunta';
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

  areas: Area[];
  respostas: Resposta[];

  possiveisRespostas: Resposta[] = [];

  modalIsVisible: boolean = false;

  constructor(
    private PerguntaService: PerguntaService,
    private RespostaService:RespostaService,
    private AreaService: AreaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.PerguntaService.list().subscribe((perguntas) => {
      this.perguntas = perguntas;
    });

    this.AreaService.list().subscribe((areas) => {
      this.areas = areas;
    });
  }

  getAreaName(id: number) {
    return this.areas.find((element) => element.id === id).nome;
  }

  getRespostaResposta(id: number) {
    return this.respostas.find((element) => element.id === id).resposta;
  }

  getRespostaByAreaId(id: number) {
    this.RespostaService.listByArea(id).subscribe((respostas) => {
      this.respostas = respostas;
    });
  }

  changeSelect(type: string) {
    switch(type) {
      case "area":
        this.getRespostaByAreaId(this.pergunta.areaId);
        this.pergunta.respostaAId = null;
        this.pergunta.respostaBId = null;
        this.pergunta.respostaCId = null;
        this.pergunta.respostaDId = null;
        this.pergunta.respostaEId = null;
        break;
      case "resposta":
        this.possiveisRespostas = [
          this.pergunta.respostaAId && this.respostas.find((element) => element.id === this.pergunta.respostaAId),
          this.pergunta.respostaBId && this.respostas.find((element) => element.id === this.pergunta.respostaBId),
          this.pergunta.respostaCId && this.respostas.find((element) => element.id === this.pergunta.respostaCId),
          this.pergunta.respostaCId && this.respostas.find((element) => element.id === this.pergunta.respostaCId),
          this.pergunta.respostaDId && this.respostas.find((element) => element.id === this.pergunta.respostaDId),
        ]
        break;
    }
  }

  save() {
    this.PerguntaService.save(this.pergunta).subscribe(
      pergunta => this.perguntas.push(pergunta),
      error => console.log(error)
    )
  }

  edit() {
    this.PerguntaService.edit(this.updatedPergunta).subscribe(
      () => {
        this.reloadData();
        this.closeModal();
      },
      error => {
        console.log(error);
        this.closeModal();
      }
    )
  }

  delete(id: number) {
    this.PerguntaService.delete(id).subscribe(() => {
          this.perguntas = this.perguntas.filter((element) => element.id !== id)
      }
    )
  }

  openModal(pergunta: Pergunta) {
    this.updatedPergunta = Object.assign({}, pergunta);
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
