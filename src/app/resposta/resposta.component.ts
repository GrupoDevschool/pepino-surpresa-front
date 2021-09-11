import { Component, OnInit } from '@angular/core';
import { AreaService } from '../core/area.service';
import { Area } from '../shared/model/Area';
import { Resposta } from '../shared/model/Resposta';
import { RespostaService } from './../core/resposta.service';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.css']
})
export class RespostaComponent implements OnInit {

  respostas: Resposta[];
  resposta: Resposta = {} as Resposta;
  updatedResposta: Resposta = {} as Resposta;

  areas: Area[];

  modalIsVisible: boolean = false;

  constructor(private RespostaService:RespostaService, private AreaService: AreaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.RespostaService.list().subscribe((respostas) => {
      this.respostas = respostas;
    });

    this.AreaService.list().subscribe((areas) => {
      this.areas = areas;
    });
  }

  getAreaName(id: number) {
    return this.areas.find((element) => element.id === id).nome;
  }

  save() {
    this.RespostaService.save(this.resposta).subscribe(
      resposta => this.respostas.push(resposta),
      error => console.log(error)
    )
  }

  edit() {
    this.RespostaService.edit(this.updatedResposta).subscribe(
      () => {
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
    this.RespostaService.delete(id).subscribe(() => {
          this.respostas = this.respostas.filter((element) => element.id !== id)
      }
    )
  }

  openModal(resposta: Resposta) {
    this.updatedResposta = Object.assign({}, resposta);
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
