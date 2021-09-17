import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Resposta, RespostaDTO } from '../shared/model/Resposta';
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
  disciplina: Disciplina[];

  updatedResposta: Resposta = {} as Resposta;
  updatedDisciplina: Disciplina[];

  disciplinas: Disciplina[];

  modalIsVisible: boolean = false;

  dropdownSettings: IDropdownSettings = {};

  constructor(private RespostaService:RespostaService, private DisciplinaService: DisciplinaService) {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'nome',
      enableCheckAll: false,
      unSelectAllText: 'Limpar seleção',
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.reloadData();
  }

  getDisciplinaNomePeloId(id: number): string {
    return this.disciplinas.find((disciplina) => disciplina.id === id).nome;
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
    const newResposta: RespostaDTO = {
      conteudo: this.resposta.conteudo,
      disciplinaId: this.disciplina[0].id
    }

    this.RespostaService.save(newResposta).subscribe(
      resposta => this.respostas.push(resposta),
      error => console.log(error)
    )
  }

  edit() {
    const editedResposta: RespostaDTO = {
      id: this.updatedResposta.id,
      conteudo: this.updatedResposta.conteudo,
      disciplinaId: this.updatedDisciplina[0].id
    }

    this.RespostaService.edit(editedResposta).subscribe(
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
    this.updatedDisciplina = Array.of(resposta.disciplina);
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }

}
