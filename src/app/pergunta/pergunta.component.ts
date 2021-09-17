import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RespostaService } from '../core/resposta.service';
import { Area } from '../shared/model/Area';
import { Disciplina } from '../shared/model/Disciplina';
import { Pergunta } from '../shared/model/Pergunta';
import { AreaService } from './../core/area.service';
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
  disciplinas: Disciplina[];
  respostas: Resposta[];
  areas: Area[];

  pergunta: Pergunta = {} as Pergunta;
  disciplina: Disciplina[];
  area: Area[];

  updatedPergunta: Pergunta = {} as Pergunta;
  updatedDisciplina: Disciplina;

  possiveisRespostas: Resposta[] = [];

  modalIsVisible: boolean = false;

  dropdownDisciplinaSettings: IDropdownSettings = {};
  dropdownAreaSettings: IDropdownSettings = {};
  dropdownRespostaSettings: IDropdownSettings = {};

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
        textField: 'descricao',
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
    // this.DisciplinaService.listByArea(id).subscribe((disciplinas) => {
    //   this.disciplina = disciplinas;
    // });
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
          this.area = Array.of(this.disciplina[0].areas[0]);
          this.getRespostaByDisciplinaId(this.disciplina[0].id);
        } else if (this.area.length){
          this.getRespostaByAreaId(this.area[0].id)
        } else {
          this.getRespostas();
        }
        break;
      case "resposta":
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
