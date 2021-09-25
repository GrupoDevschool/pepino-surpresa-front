import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Avaliacao } from 'src/app/shared/model/Avaliacao';
import { Pergunta } from 'src/app/shared/model/Pergunta';
import { Resposta } from 'src/app/shared/model/Resposta';
import { AvaliacaoService } from './../../core/avaliacao.service';
import { PerguntaService } from './../../core/pergunta.service';
import { QuestaoService } from './../../core/questao.service';
import { RespostaService } from './../../core/resposta.service';
import { FormattedQuestao, Questao } from './../../shared/model/Questao';

@Component({
  selector: 'app-avaliacao-detalhes',
  templateUrl: './avaliacao-detalhes.component.html',
  styleUrls: ['./avaliacao-detalhes.component.css']
})
export class AvaliacaoDetalhesComponent implements OnInit {

  avaliacao: Avaliacao;
  questoes: Questao[];
  questoesFormatadas: FormattedQuestao[];
  perguntas: Pergunta[];
  respostas: Resposta[];

  constructor(
    private route: ActivatedRoute,
    private avaliacaoService: AvaliacaoService,
    private questaoService: QuestaoService,
    private perguntaService: PerguntaService,
    private respostaService: RespostaService) { }

  ngOnInit(): void {
    const avaliacaoId = this.route.snapshot.params.id;

    this.avaliacaoService.show(avaliacaoId).subscribe(avaliacao => {
      this.avaliacao = avaliacao;

      this.perguntaService.list().subscribe(perguntas => {
        this.perguntas = perguntas;

        this.respostaService.list().subscribe(respostas => {
          this.respostas = respostas;

          this.questaoService.listByAvaliacao(avaliacaoId).subscribe(questoes => {
            this.questoes = questoes;
            this.questoesFormatadas = this.questoes.map(questao => this.formatQuestao(questao));
          });
        });
      });

    });
  }

  formatQuestao(questao: Questao): FormattedQuestao {
    const perguntaId = questao.perguntaResposta.splice(0, 1)[0];

    const formattedQuestao: FormattedQuestao = {
      id: questao.id,
      numero: questao.numero,
      pergunta: this.perguntas.find(pergunta => pergunta.id === perguntaId),
      respostas: this.respostas.filter(resposta => questao.perguntaResposta.includes(resposta.id))
    };

    return formattedQuestao;
  }

  convertIndexAlternativa(indexOfelement: number): string {
    return String.fromCharCode(65 + indexOfelement);
  }

}
