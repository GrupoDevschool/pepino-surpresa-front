import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvaliacaoService } from '../core/avaliacao.service';
import { Avaliacao } from '../shared/model/Avaliacao';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  avaliacoes: Avaliacao[];
  avaliacao: Avaliacao;

  constructor(private avaliacaoService: AvaliacaoService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    //this.avaliacoes = this.avaliacaoService.listar();
    this.avaliacoes = [
      {date: "7/09/2021", description: "afasf"},
      {date: "8/09/2021", description: "afasf"},
      {date: "9/09/2021", description: "afasf"},
      {date: "1/09/2021", description: "afasf"},
    ] as Avaliacao[]
  }

  save() {
    this.avaliacaoService.salvar(this.avaliacao).subscribe(
      avaliacao => console.log(avaliacao),
      error => console.log(error)
    )
  }


}
