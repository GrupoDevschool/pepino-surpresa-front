import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DisciplinaService } from '../core/disciplina.service';
import { Disciplina } from '../shared/model/Disciplina';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  disciplinas: Observable<Disciplina[]>;
  disciplina: Disciplina;

  constructor(private disciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.disciplinas = this.disciplinaService.listar();
  }

  save() {
    this.disciplinaService.salvar(this.disciplina).subscribe(
      disciplina => console.log(disciplina),
      error => console.log(error)
    )
  }


}
