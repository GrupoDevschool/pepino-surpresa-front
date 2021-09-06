import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../core/disciplina.service';
import { Disciplina } from '../shared/model/Disciplina';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  disciplinas: Disciplina[];
  disciplina: Disciplina = {} as Disciplina;

  constructor(private disciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.disciplinaService.listar().subscribe((disciplina) => {
      this.disciplinas = disciplina;
    });
  }

  save() {
    this.disciplinaService.salvar(this.disciplina).subscribe(
      () => this.reloadData(),
      error => console.log(error)
    )
  }

  edit(disciplina: Disciplina) {
    this.disciplinaService.editar(disciplina).subscribe(
      () => this.reloadData(),
      error => console.log(error))
  }

  delete(id: number) {
    this.disciplinaService.excluir(id).subscribe(
      ()=> this.reloadData(),
    (error) => console.log(error))
  }

}
