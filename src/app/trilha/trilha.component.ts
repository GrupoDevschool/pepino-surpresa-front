import { Disciplina } from './../shared/model/Disciplina';
import { Trilha } from './../shared/model/Trilha';
import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../core/disciplina.service';
import { TrilhaService } from '../core/trilha.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.css']
})
export class TrilhaComponent implements OnInit {

  trilhas: Trilha[];
  trilha: Trilha = {} as Trilha;

  disciplinas: Disciplina[];

  disciplinasSelecionadas = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private trilhaService: TrilhaService, private disciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    this.reloadData();
    this.disciplinasSelecionadas = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Selecionar todas',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  reloadData() {
    this.disciplinaService.list().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    })

    this.trilhaService.list().subscribe((trilhas) => {
      this.trilhas = trilhas;
    });
  }

  formatDisciplina(disciplinas: Disciplina[]): string {
    return disciplinas.map((disciplina) => disciplina.nome).join(', ')
  }

  save() {
    this.trilha.disciplinas = this.disciplinasSelecionadas;
    this.trilhaService.save(this.trilha).subscribe(
      trilha => this.trilhas.push(trilha),
      error => console.log(error)
    )
  }

  edit(trilha: Trilha) {
    this.trilhaService.edit(trilha).subscribe(() => {
      const index = this.trilhas.findIndex(a => a.id === trilha.id);
      if (index !== -1) {
        this.trilhas[index] = trilha;
      }
    })
  }

  delete(id: number) {
    this.trilhaService.delete(id).subscribe(() => {
        this.trilhas = this.trilhas.filter((element) => element.id !== id)
      }
    )
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
