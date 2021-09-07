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
  updatedAvaliacao: Avaliacao = {} as Avaliacao;

  modalIsVisible: boolean = false;

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

  edit() {
    this.avaliacaoService.edit(this.updatedAvaliacao).subscribe(() => {
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
    this.avaliacaoService.delete(id).subscribe(() => {
      // a função filter recebe uma função a ser executada em cada elemento do array
      // nesse caso, estou salvando no array de avaliações as avaliações que tem id diferente do que recebi
        this.avaliacoes = this.avaliacoes.filter((element) => element.id !== id)
      }
    )
  }

  openModal(avalicao: Avaliacao) {
    this.updatedAvaliacao = avalicao;
    console.log(this.updatedAvaliacao);
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
