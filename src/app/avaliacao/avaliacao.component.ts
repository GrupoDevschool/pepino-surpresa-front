import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../core/avaliacao.service';
import { Avaliacao } from '../shared/model/Avaliacao';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  avaliacoes: Avaliacao[];
  avaliacao: Avaliacao = {} as Avaliacao;

  constructor(private avaliacaoService: AvaliacaoService) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.avaliacaoService.listar().subscribe((avaliacoes) => {
      this.avaliacoes = avaliacoes;
    });
  }

  save() {
    /* this.avaliacaoService.salvar(this.avaliacao).subscribe(
      avaliacao => console.log(avaliacao),
      error => console.log(error)
    ) */
  }

}
