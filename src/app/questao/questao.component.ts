import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Area } from '../shared/model/Area';
import { Disciplina } from '../shared/model/Disciplina';
import { Pergunta } from '../shared/model/Pergunta';
import { Questao } from '../shared/model/Questao';
import { Resposta } from '../shared/model/Resposta';
import { AreaService } from './../core/area.service';
import { AvaliacaoService } from './../core/avaliacao.service';
import { DisciplinaService } from './../core/disciplina.service';
import { PerguntaService } from './../core/pergunta.service';
import { QuestaoService } from './../core/questao.service';
import { RespostaService } from './../core/resposta.service';
import { Avaliacao } from './../shared/model/Avaliacao';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {

  avaliacoes: Avaliacao[];
  questoes: Questao[];
  perguntas: Pergunta[];
  disciplinas: Disciplina[];
  respostas: Resposta[];
  areas: Area[];

  questao: Questao = {} as Questao;
  avaliacao: Avaliacao[] = [];
  pergunta: Pergunta[] = [];
  respostaCorreta: Resposta[] = [];
  disciplina: Disciplina[] = [];
  area: Area[];

  respostaA: Resposta[] = [];
  respostaB: Resposta[] = [];
  respostaC: Resposta[] = [];
  respostaD: Resposta[] = [];
  respostaE: Resposta[] = [];

  updatedQuestao: Questao;
  updatedAvaliacao: Avaliacao[];
  updatedPergunta: Pergunta[];
  updatedDisciplina: Disciplina[];
  updatedArea: Area[];
  updatedRespostas: Resposta[] = [];
  updatedRespostaCorreta: Resposta[] = [];
  updatedRespostaA: Resposta[] = [];
  updatedRespostaB: Resposta[] = [];
  updatedRespostaC: Resposta[] = [];
  updatedRespostaD: Resposta[] = [];
  updatedRespostaE: Resposta[] = [];

  updateModalIsVisible: boolean = false;
  perguntaModalIsVisible: boolean = false;

  dropdownAvaliacaoSettings: IDropdownSettings = {};
  dropdownDisciplinaSettings: IDropdownSettings = {};
  dropdownAreaSettings: IDropdownSettings = {};
  dropdownPerguntaSettings: IDropdownSettings = {};
  dropdownRespostaSettings: IDropdownSettings = {};
  dropdownrRespostaCorretaSettings: IDropdownSettings = {};

  constructor(
    private QuestaoService: QuestaoService,
    private AvaliacaoService: AvaliacaoService,
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

      this.dropdownAvaliacaoSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'descricao',
        enableCheckAll: false,
        unSelectAllText: 'Limpar seleção',
        allowSearchFilter: true
      };

      this.dropdownPerguntaSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'enunciado',
        enableCheckAll: false,
        unSelectAllText: 'Limpar seleção',
        allowSearchFilter: true,
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
        allowSearchFilter: true,
      };
    }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.AvaliacaoService.list().subscribe((avaliacoes) => {
      this.avaliacoes = avaliacoes;
    });

    this.getQuestoes();

    this.getPerguntas();

    this.PerguntaService.list().subscribe((perguntas) => {
      this.perguntas = perguntas;
    });

    this.getDisciplinas();

    this.AreaService.list().subscribe((areas) => {
      this.areas = areas;
    });

    this.getRespostas();
  }

  getAvaliacaoDescricaoById(id: number): string {
    return this.avaliacoes.find(element => element.id === id).descricao;
  }

  getAvaliacaoDataById(id: number): string {
    return this.avaliacoes.find(element => element.id === id).data;
  }

  getQuestoes() {
    this.QuestaoService.list().subscribe((questoes) => {
      this.questoes = questoes;
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

  getRespostaByDisciplinaId(id: number) {
    this.RespostaService.listByDisciplina(id).subscribe((respostas) => {
      this.respostas = respostas;
    });
  }

  findRespostaById(id: number): Resposta {
    return this.respostas.find(element => element.id === id);
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

  getPerguntas() {
    this.PerguntaService.list().subscribe((perguntas) => {
      this.perguntas = perguntas;
    });
  }

  getPerguntaByAreaId(id: number) {
    this.PerguntaService.listByArea(id).subscribe((perguntas) => {
      this.perguntas = perguntas;
    });
  }

  getPerguntaByDisciplinaId(id: number) {
    this.PerguntaService.listByDisciplina(id).subscribe((perguntas) => {
      this.perguntas = perguntas;
    });
  }

  changeSelect(type: string) {
    switch(type) {
      case "area":
        this.pergunta = [];
        this.disciplina = [];

        if (this.area.length) {
          this.getRespostaByAreaId(this.area[0].id)
          this.getPerguntaByAreaId(this.area[0].id)
          this.getDisciplinaByAreaId(this.area[0].id);
        } else {
          this.getRespostas();
          this.getPerguntas();
          this.getDisciplinas();
        }

        break;
      case "disciplina":
        this.pergunta = [];

        if (this.disciplina.length) {
          this.disciplina = Array.of(this.disciplinas.find((element) => element.id === this.disciplina[0].id));

          this.area = Array.of(this.disciplina[0].areas[0]);

          this.getRespostaByDisciplinaId(this.disciplina[0].id);
          this.getPerguntaByDisciplinaId(this.disciplina[0].id);

        } else if (this.area.length){
          this.getRespostaByAreaId(this.area[0].id)
          this.getPerguntaByAreaId(this.area[0].id)
        } else {
          this.getRespostas();
          this.getPerguntas();
        }
        break;
      case "pergunta":
        if (this.pergunta.length) {
          this.pergunta = Array.of(this.perguntas.find((element) => element.id === this.pergunta[0].id));
          this.respostaCorreta = Array.of(this.pergunta[0].respostaCorreta);
          this.respostaA = Array.of(this.pergunta[0].respostas[0]);
          this.respostaB = Array.of(this.pergunta[0].respostas[1]);
          this.respostaC = Array.of(this.pergunta[0].respostas[2]);
          this.respostaD = Array.of(this.pergunta[0].respostas[3]);
          this.respostaE = Array.of(this.pergunta[0].respostas[4]);
        } else {
          this.respostaCorreta = [];
          this.respostaA = [];
          this.respostaB = [];
          this.respostaC = [];
          this.respostaD = [];
          this.respostaE = [];
        }

        break;
      case "updatedArea":
        this.updatedPergunta = [];
        this.updatedDisciplina = [];

        if (this.updatedArea.length) {
          this.getRespostaByAreaId(this.updatedArea[0].id)
          this.getDisciplinaByAreaId(this.updatedArea[0].id);
          this.getPerguntaByAreaId(this.area[0].id);
        } else {
          this.getRespostas();
          this.getPerguntas();
          this.getDisciplinas();
        }

        break;
      case "updatedDisciplina":
        this.updatedPergunta = [];

        if (this.updatedDisciplina.length) {
          this.updatedDisciplina = Array.of(this.disciplinas.find((element) => element.id === this.updatedDisciplina[0].id));

          this.updatedArea = Array.of(this.updatedDisciplina[0].areas[0]);

          this.getRespostaByDisciplinaId(this.updatedDisciplina[0].id);
          this.getPerguntaByDisciplinaId(this.updatedDisciplina[0].id);

        } else if (this.updatedArea.length){
          this.getRespostaByAreaId(this.updatedArea[0].id)
          this.getPerguntaByAreaId(this.updatedArea[0].id)
        } else {
          this.getRespostas();
          this.getPerguntas();
        }
        break;
      case "updatedPergunta":
        if (this.updatedPergunta.length) {
          this.updatedPergunta = Array.of(this.perguntas.find((element) => element.id === this.updatedPergunta[0].id));
          this.updatedRespostaCorreta = Array.of(this.updatedPergunta[0].respostaCorreta);
          this.updatedRespostaA = Array.of(this.updatedPergunta[0].respostas[0]);
          this.updatedRespostaB = Array.of(this.updatedPergunta[0].respostas[1]);
          this.updatedRespostaC = Array.of(this.updatedPergunta[0].respostas[2]);
          this.updatedRespostaD = Array.of(this.updatedPergunta[0].respostas[3]);
          this.updatedRespostaE = Array.of(this.updatedPergunta[0].respostas[4]);
        } else {
          this.updatedRespostaCorreta = [];
          this.updatedRespostaA = [];
          this.updatedRespostaB = [];
          this.updatedRespostaC = [];
          this.updatedRespostaD = [];
          this.updatedRespostaE = [];
        }
        break;
    }
  }

  respostasValidas(type: string): boolean {
    switch(type) {
      case "create":
        // Verifica se uma pergunta e uma avaliacao foi selecionada
        if (!this.pergunta.length || !this.avaliacao.length) {
          return true
        }

        // Verifica se foi dado um numero a questão
        if (!this.questao.numero) {
          return true
        }

        // Que deus me perdoe pelos meus pecados
        const AId = this.respostaA.length ? this.respostaA[0].id : null;
        const BId = this.respostaB.length ? this.respostaB[0].id : null;
        const CId = this.respostaC.length ? this.respostaC[0].id : null;
        const DId = this.respostaD.length ? this.respostaD[0].id : null;
        const EId = this.respostaE.length ? this.respostaE[0].id : null;

        // Verifica se não existem respostas duplicadas
        if (AId === BId || AId === CId || AId === DId || AId === EId || BId === CId || BId === DId || BId === EId || CId === DId || CId === EId || DId === EId) {
          return true;
        }

        const corretaId = this.respostaCorreta[0].id;

        // Verifica se a resposta correta esta contida nas opções de resposta
        if (corretaId === AId || corretaId === BId || corretaId === CId || corretaId === DId || corretaId === EId) {
          return false
        }
        return true;
      case "update":
        // Verifica se uma pergunta e uma avaliacao foi selecionada

        if (!this.updatedPergunta.length || !this.updatedAvaliacao.length) {
          return true
        }

        // Verifica se foi dado um numero a questão
        if (!this.updatedQuestao.numero) {
          return true
        }

        // Que deus me perdoe pelos meus pecados
        const upAId = this.updatedRespostaA.length ? this.updatedRespostaA[0].id : null;
        const upBId = this.updatedRespostaB.length ? this.updatedRespostaB[0].id : null;
        const upCId = this.updatedRespostaC.length ? this.updatedRespostaC[0].id : null;
        const upDId = this.updatedRespostaD.length ? this.updatedRespostaD[0].id : null;
        const upEId = this.updatedRespostaE.length ? this.updatedRespostaE[0].id : null;

        // Verifica se não existem respostas duplicadas
        if (upAId === upBId || upAId === upCId || upAId === upDId || upAId === upEId || upBId === upCId || upBId === upDId || upBId === upEId || upCId === upDId || upCId === upEId || upDId === upEId) {
          return true;
        }

        const upCorretaId = this.updatedRespostaCorreta[0].id;

        // Verifica se a resposta correta esta contida nas opções de resposta
        if (upCorretaId === upAId || upCorretaId === upBId || upCorretaId === upCId || upCorretaId === upDId || upCorretaId === upEId) {
          return false
        }

        return true;
      default:
        return true;
    }
  };

  save() {
    const perguntaResposta: number[] = [];

    perguntaResposta.push(this.pergunta[0].id);

    this.respostaA.length && perguntaResposta.push(this.respostaA[0].id);
    this.respostaB.length && perguntaResposta.push(this.respostaB[0].id);
    this.respostaC.length && perguntaResposta.push(this.respostaC[0].id);
    this.respostaD.length && perguntaResposta.push(this.respostaD[0].id);
    this.respostaE.length && perguntaResposta.push(this.respostaE[0].id);

    const newQuestao: Questao = {
      avaliacaoId: this.avaliacao[0].id,
      numero: this.questao.numero,
      perguntaResposta,
    }

    this.QuestaoService.save(newQuestao).subscribe(
      () => this.reloadData(),
      error => console.log(error)
    );
  }

  edit() {
    const perguntaResposta: number[] = [];

    perguntaResposta.push(this.pergunta[0].id);

    this.updatedRespostaA.length && perguntaResposta.push(this.updatedRespostaA[0].id);
    this.updatedRespostaB.length && perguntaResposta.push(this.updatedRespostaB[0].id);
    this.updatedRespostaC.length && perguntaResposta.push(this.updatedRespostaC[0].id);
    this.updatedRespostaD.length && perguntaResposta.push(this.updatedRespostaD[0].id);
    this.updatedRespostaE.length && perguntaResposta.push(this.updatedRespostaE[0].id);

    const newQuestao: Questao = {
      id: this.updatedQuestao.id,
      avaliacaoId: this.updatedAvaliacao[0].id,
      numero: this.updatedQuestao.numero,
      perguntaResposta,
    }

    this.QuestaoService.edit(newQuestao).subscribe(
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
    this.QuestaoService.delete(id).subscribe(() => {
          this.questoes = this.questoes.filter((element) => element.id !== id)
      }
    )
  }

  openPerguntaModal(questao: Questao) {
    this.updatedQuestao = Object.assign({},questao);
    this.updatedAvaliacao = Array.of(this.avaliacoes.find(element => element.id === questao.avaliacaoId));
    this.updatedPergunta = Array.of(this.perguntas.find(element => element.id === questao.perguntaResposta[0]));
    this.updatedDisciplina = Array.of(this.updatedPergunta[0].disciplina);
    this.updatedArea = Array.of(this.updatedDisciplina[0].areas[0]);
    this.updatedRespostaCorreta = Array.of(this.updatedPergunta[0].respostaCorreta);

    if (questao.perguntaResposta.length > 1)
      this.updatedRespostaA = Array.of(this.findRespostaById(questao.perguntaResposta[1]));

    if (questao.perguntaResposta.length > 2)
    this.updatedRespostaB = Array.of(this.findRespostaById(questao.perguntaResposta[2]));

    if (questao.perguntaResposta.length > 3)
    this.updatedRespostaC = Array.of(this.findRespostaById(questao.perguntaResposta[3]));

    if (questao.perguntaResposta.length > 4)
    this.updatedRespostaD = Array.of(this.findRespostaById(questao.perguntaResposta[4]));

    if (questao.perguntaResposta.length > 5)
    this.updatedRespostaE = Array.of(this.findRespostaById(questao.perguntaResposta[5]));

    console.log(this.updatedQuestao)

    this.perguntaModalIsVisible = true;
  }

  closePerguntaModal() {
    this.perguntaModalIsVisible = false;
  }

  openUpdateModal(questao: Questao) {
    this.updatedQuestao = Object.assign({},questao);
    this.updatedAvaliacao = Array.of(this.avaliacoes.find(element => element.id === questao.avaliacaoId));
    this.updatedPergunta = Array.of(this.perguntas.find(element => element.id === questao.perguntaResposta[0]));
    this.updatedDisciplina = Array.of(this.updatedPergunta[0].disciplina);
    this.updatedArea = Array.of(this.updatedDisciplina[0].areas[0]);
    this.updatedRespostaCorreta = Array.of(this.updatedPergunta[0].respostaCorreta);

    if (questao.perguntaResposta.length > 1)
      this.updatedRespostaA = Array.of(this.findRespostaById(questao.perguntaResposta[1]));

    if (questao.perguntaResposta.length > 2)
    this.updatedRespostaB = Array.of(this.findRespostaById(questao.perguntaResposta[2]));

    if (questao.perguntaResposta.length > 3)
    this.updatedRespostaC = Array.of(this.findRespostaById(questao.perguntaResposta[3]));

    if (questao.perguntaResposta.length > 4)
    this.updatedRespostaD = Array.of(this.findRespostaById(questao.perguntaResposta[4]));

    if (questao.perguntaResposta.length > 5)
    this.updatedRespostaE = Array.of(this.findRespostaById(questao.perguntaResposta[5]));

    this.updateModalIsVisible = true;
  }

  closeUpdateModal() {
    this.updateModalIsVisible = false;
  }

}
