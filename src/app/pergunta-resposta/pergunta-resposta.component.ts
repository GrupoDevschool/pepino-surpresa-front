import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Area } from '../shared/model/Area';
import { Pergunta } from '../shared/model/Pergunta';
import { Resposta } from '../shared/model/Resposta';
import { AreaService } from './../core/area.service';
import { PerguntaService } from './../core/pergunta.service';
import { RespostaService } from './../core/resposta.service';

@Component({
  selector: 'app-pergunta-resposta',
  templateUrl: './pergunta-resposta.component.html',
  styleUrls: ['./pergunta-resposta.component.css']
})
export class PerguntaRespostaComponent implements OnInit {
  pergunta: Pergunta = {} as Pergunta;
  updatedPergunta: Pergunta = {} as Pergunta;

  areas: Area[];
  respostas: Resposta[];

  possiveisRespostas: Resposta[] = [];

  modalIsVisible: boolean = false;

  constructor(private PerguntaService: PerguntaService,
    private RespostaService:RespostaService,
    private AreaService: AreaService,
    private route: ActivatedRoute) { }

  reloadData(id: number) {
    this.PerguntaService.show(id).subscribe((pergunta) => {
      this.pergunta = pergunta;
    });

    this.AreaService.list().subscribe((areas) => {
      this.areas = areas;
    });
  }



  edit() {
    this.PerguntaService.edit(this.updatedPergunta).subscribe(
      () => {
        this.reloadData(this.pergunta.id);
        this.closeModal();
      },
      error => {
        console.log(error);
        this.closeModal();
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

  ngOnInit(): void {
    const perguntaId = this.route.snapshot.params.perguntaSlug;
    this.reloadData(perguntaId);
  }

}
