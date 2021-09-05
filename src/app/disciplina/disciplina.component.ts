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

  edit(disciplina: Disciplina) {
    this.disciplinaService.edit(disciplina).subscribe(() => {
      const index = this.disciplinas.findIndex(a => a.id === disciplina.id);
      if (index !== -1) {
        this.disciplinas[index] = disciplina;
      }
    })
  }

  delete(id: number) {
    this.disciplinaService.delete(id).subscribe(() => {
          this.disciplinas = this.disciplinas.filter((element) => element.id !== id)
      }
    )
  }

}
