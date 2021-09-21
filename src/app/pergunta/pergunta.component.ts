import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RespostaService } from '../core/resposta.service';
import { Area } from '../shared/model/Area';
import { Disciplina } from '../shared/model/Disciplina';
import { Pergunta, PerguntaDTO } from '../shared/model/Pergunta';
import { AreaService } from './../core/area.service';
import { DisciplinaService } from './../core/disciplina.service';
import { PerguntaService } from './../core/pergunta.service';
import { Resposta, RespostaDTO } from './../shared/model/Resposta';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {

  perguntas: Pergunta[];
  disciplinas: Disciplina[];
  respostas: Resposta[];
  areas: Area[];

  pergunta: Pergunta = {} as Pergunta;
  possiveisRespostas: Resposta[] = [];
  respostaCorreta: Resposta[] = [];
  disciplina: Disciplina[] = [];
  area: Area[];
  resposta: Resposta = {} as Resposta;

  updatedPergunta: Pergunta = {} as Pergunta;
  updatedDisciplina: Disciplina[];
  updatedArea: Area[];
  updatedRespostas: Resposta[] = [];
  updatedRespostaCorreta: Resposta[] = [];

  criarRespostasModalIsVisible: boolean = false;
  updateModalIsVisible: boolean = false;
  responseModalIsVisible: boolean = false;

  dropdownDisciplinaSettings: IDropdownSettings = {};
  dropdownAreaSettings: IDropdownSettings = {};
  dropdownRespostaSettings: IDropdownSettings = {};
  dropdownrRespostaCorretaSettings: IDropdownSettings = {};

  constructor(
    private PerguntaService: PerguntaService,
    private RespostaService:RespostaService,
    private DisciplinaService: DisciplinaService,
    private AreaService: AreaService) {
      this.dropdownDisciplinaSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'nome',
        enableCheckAll: false,
        unSelectAllText: 'Limpar seleção',
        allowSearchFilter: true
      };

      this.dropdownAreaSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'nome',
        enableCheckAll: false,
        unSelectAllText: 'Limpar seleção',
        allowSearchFilter: true
      };

      this.dropdownRespostaSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'conteudo',
        enableCheckAll: false,
        unSelectAllText: 'Limpar seleção',
        itemsShowLimit: 5,
        limitSelection: 5,
        allowSearchFilter: true
      };

      this.dropdownrRespostaCorretaSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'conteudo',
        enableCheckAll: false,
        unSelectAllText: 'Limpar seleção',
        allowSearchFilter: true
      };
    }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.PerguntaService.list().subscribe((perguntas) => {
      this.perguntas = perguntas;
    });

    this.getDisciplinas();

    this.AreaService.list().subscribe((areas) => {
      this.areas = areas;
    });

    this.getRespostas();
  }

  getRespostaByDisciplinaId(id: number) {
    this.RespostaService.listByDisciplina(id).subscribe((respostas) => {
      this.respostas = respostas;
    });
  }

  getRespostas() {
    this.RespostaService.list().subscribe((respostas) => {
      this.respostas = respostas;
    });
  }

  getRespostaByAreaId(id: number) {
    this.RespostaService.listByArea(id).subscribe((respostas) => {
      this.respostas = respostas;
    });
  }

  getDisciplinas() {
    this.DisciplinaService.list().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    });
  }

  getDisciplinaByAreaId(id: number) {
    this.DisciplinaService.listByArea(id).subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    });
  }

  changeSelect(type: string) {
    switch(type) {
      case "area":
        this.possiveisRespostas = [];

        this.disciplina = [];

        if (this.area.length) {
          this.getRespostaByAreaId(this.area[0].id)
          this.getDisciplinaByAreaId(this.area[0].id);
        } else {
          this.getRespostas();
          this.getDisciplinas();
        }

        break;
      case "disciplina":
        this.possiveisRespostas = [];

        if (this.disciplina.length) {
          this.disciplina = Array.of(this.disciplinas.find((element) => element.id === this.disciplina[0].id));

          this.area = Array.of(this.disciplina[0].areas[0]);

          this.getRespostaByDisciplinaId(this.disciplina[0].id);

        } else if (this.area.length){
          this.getRespostaByAreaId(this.area[0].id)
        } else {
          this.getRespostas();
        }
        break;
      case "resposta":
        this.respostaCorreta = [];
        break;
      case "updatedArea":
        this.updatedRespostas = [];

        this.updatedDisciplina = [];

        if (this.updatedArea.length) {
          this.getRespostaByAreaId(this.updatedArea[0].id)
          this.getDisciplinaByAreaId(this.updatedArea[0].id);
        } else {
          this.getRespostas();
          this.getDisciplinas();
        }

        break;
      case "updatedDisciplina":
        this.updatedRespostas = [];

        if (this.updatedDisciplina.length) {
          this.updatedDisciplina = Array.of(this.disciplinas.find((element) => element.id === this.updatedDisciplina[0].id));

          this.updatedArea = Array.of(this.updatedDisciplina[0].areas[0]);

          this.getRespostaByDisciplinaId(this.updatedDisciplina[0].id);

        } else if (this.updatedArea.length){
          this.getRespostaByAreaId(this.updatedArea[0].id)
        } else {
          this.getRespostas();
        }
        break;
      case "updatedResposta":
        this.updatedRespostaCorreta = [];
        break;
    }
  }

  save() {
    const newPergunta: PerguntaDTO = {
      enunciado: this.pergunta.enunciado,
      disciplinaId: this.disciplina[0].id,
      respostas: this.possiveisRespostas,
      respostaCorretaId: this.respostaCorreta[0].id
    }

    this.PerguntaService.save(newPergunta).subscribe(
      () => this.reloadData(),
      error => console.log(error)
    );
  }

  edit() {
    const newPergunta: PerguntaDTO = {
      id: this.updatedPergunta.id,
      enunciado: this.updatedPergunta.enunciado,
      disciplinaId: this.updatedDisciplina[0].id,
      respostas: this.updatedRespostas,
      respostaCorretaId: this.updatedRespostaCorreta[0].id
    }

    this.PerguntaService.edit(newPergunta).subscribe(
      () => {
        this.reloadData();
        this.closeUpdateModal();
      },
      error => {
        console.log(error);
        this.closeUpdateModal();
      }
    );
  }

  delete(id: number) {
    this.PerguntaService.delete(id).subscribe(() => {
          this.perguntas = this.perguntas.filter((element) => element.id !== id)
      }
    )
  }

  openCriarRespostaModal(resposta: Resposta) {
    this.resposta = Object.assign({}, resposta);
    this.disciplina = Array.of(resposta.disciplina);

    this.criarRespostasModalIsVisible = true
  }

  closeCriarRespostaModal(){
    this.criarRespostasModalIsVisible = false;
  }

  saveCriarRespostaModal(){
    const newResposta: RespostaDTO = {
      conteudo: this.resposta.conteudo,
      disciplinaId: this.disciplina[0].id
    }

    this.RespostaService.save(newResposta).subscribe(
      resposta => this.respostas.push(resposta),
      error => console.log(error)
    )
  }

  openResponseModal(pergunta: Pergunta) {
    this.updatedPergunta = Object.assign({}, pergunta);
    this.updatedDisciplina = Array.of(pergunta.disciplina);
    this.updatedRespostas = Object.assign([], pergunta.respostas);
    this.updatedRespostaCorreta = Array.of(pergunta.respostaCorreta);
    this.updatedArea = Array.of(pergunta.disciplina.areas[0]);

    this.responseModalIsVisible = true;
  }

  closeResponseModal() {
    this.responseModalIsVisible = false;
  }

  openUpdateModal(pergunta: Pergunta) {
    this.updatedPergunta = Object.assign({}, pergunta);
    this.updatedDisciplina = Array.of(pergunta.disciplina);
    this.updatedRespostas = Object.assign([], pergunta.respostas);
    this.updatedArea = Array.of(pergunta.disciplina.areas[0]);
    this.updatedRespostaCorreta = Array.of(pergunta.respostaCorreta);

    this.updateModalIsVisible = true;
  }

  closeUpdateModal() {
    this.updateModalIsVisible = false;
  }
}
