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
    this.avaliacaoService.list().subscribe((avaliacoes) => {
      this.avaliacoes = avaliacoes;
    });
  }

  save() {
    this.avaliacaoService.save(this.avaliacao).subscribe(
      avaliacao => this.avaliacoes.push(avaliacao),
      error => console.log(error)
    )
  }

  edit(avaliacao: Avaliacao) {
    this.avaliacaoService.edit(avaliacao).subscribe(() => {
      const index = this.avaliacoes.findIndex(a => a.id === avaliacao.id);
      if (index !== -1) {
        this.avaliacoes[index] = avaliacao;
      }
    })
  }

  delete(id: number) {
    this.avaliacaoService.delete(id).subscribe(() => {
      // a função filter recebe uma função a ser executada em cada elemento do array
      // nesse caso, estou salvando no array de avaliações as avaliações que tem id diferente do que recebi
        this.avaliacoes = this.avaliacoes.filter((element) => element.id !== id)
      }
    )
  }

}
