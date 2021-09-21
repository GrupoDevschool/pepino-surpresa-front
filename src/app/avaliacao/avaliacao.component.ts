import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AvaliacaoService } from '../core/avaliacao.service';
import { Avaliacao, AvaliacaoDTO } from '../shared/model/Avaliacao';
import { GestorService } from './../core/gestor.service';
import { Gestor } from './../shared/model/Gestor';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  avaliacoes: Avaliacao[];
  gestores: Gestor[];

  avaliacao: Avaliacao = {} as Avaliacao;
  gestor: Gestor[];
  updatedAvaliacao: Avaliacao = {} as Avaliacao;
  updatedGestor: Gestor[];

  modalIsVisible: boolean = false;

  dropdownSettings: IDropdownSettings = {};

  constructor(private avaliacaoService: AvaliacaoService, private gestorService: GestorService) {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'nome',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.avaliacaoService.list().subscribe((avaliacoes) => {
      this.avaliacoes = avaliacoes;
    });

    this.gestorService.list().subscribe((gestores) => {
      this.gestores = gestores;
    });
  }

  save() {
    const newAvaliacao: AvaliacaoDTO = {
      data: this.avaliacao.data,
      descricao: this.avaliacao.descricao,
      gestorId: this.gestor[0].id
    };

    this.avaliacaoService.save(newAvaliacao).subscribe(
      () => this.reloadData(),
      error => console.log(error)
    )
  }

  edit() {
    const newAvaliacao: AvaliacaoDTO = {
      id: this.updatedAvaliacao.id,
      data: this.updatedAvaliacao.data,
      descricao: this.updatedAvaliacao.descricao,
      gestorId: this.updatedGestor[0].id
    };

    this.avaliacaoService.edit(newAvaliacao).subscribe(() => {
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

  openModal(avaliacao: Avaliacao) {
    this.updatedAvaliacao = Object.assign({}, avaliacao);
    this.updatedGestor = Array.of(avaliacao.gestor);

    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }

}
