import { Component, OnInit } from '@angular/core';
import { Resposta } from '../shared/model/Resposta';
import { DisciplinaService } from './../core/disciplina.service';
import { RespostaService } from './../core/resposta.service';
import { Disciplina } from './../shared/model/Disciplina';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.css']
})
export class RespostaComponent implements OnInit {

  respostas: Resposta[];
  resposta: Resposta = {} as Resposta;
  updatedResposta: Resposta = {} as Resposta;

  disciplinas: Disciplina[];

  modalIsVisible: boolean = false;

  constructor(private RespostaService:RespostaService, private DisciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.RespostaService.list().subscribe((respostas) => {
      this.respostas = respostas;
    });

    this.DisciplinaService.list().subscribe((Disciplina) => {
      this.disciplinas = Disciplina;
    });
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

  formatDisciplina(disciplinas: Disciplina[]): string {
    return disciplinas.map((disciplina) => disciplina.nome).join(', ')
  }

  openModal(resposta: Resposta) {
    this.updatedResposta = Object.assign({}, resposta);
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }

}
