import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../core/disciplina.service';
import { Disciplina } from '../shared/model/Disciplina';

@Component({
  selector: 'app-disciplina',
  templateUrl:'./disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  disciplinas: Disciplina[];
  disciplina: Disciplina = {} as Disciplina;
  updatedDisciplina: Disciplina = {} as Disciplina;

  modalIsVisible: boolean = false;

  constructor(private disciplinaService:DisciplinaService) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.disciplinaService.list().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    });
  }

  save() {
    this.disciplinaService.save(this.disciplina).subscribe(
      disciplina => this.disciplinas.push(disciplina),
      error => console.log(error)
    )
  }

  edit() {
    this.disciplinaService.edit(this.updatedDisciplina).subscribe(
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
    this.disciplinaService.delete(id).subscribe(() => {
          this.disciplinas = this.disciplinas.filter((element) => element.id !== id)
      }
    )
  }

  openModal(disciplina: Disciplina) {
    this.updatedDisciplina = Object.assign({}, disciplina);
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
