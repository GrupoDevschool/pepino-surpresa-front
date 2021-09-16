import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DisciplinaService } from '../core/disciplina.service';
import { Area } from '../shared/model/Area';
import { Disciplina } from '../shared/model/Disciplina';
import { AreaService } from './../core/area.service';

@Component({
  selector: 'app-disciplina',
  templateUrl:'./disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  disciplinas: Disciplina[];
  disciplina: Disciplina = {} as Disciplina;
  updatedDisciplina: Disciplina = {} as Disciplina;
  updatedArea: Area[] = [];

  modalIsVisible: boolean = false;

  areas: Area[];

  areasSelecionadas = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(private disciplinaService:DisciplinaService, private areaService: AreaService) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.areasSelecionadas = []
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'descricao',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  reloadData() {
    this.disciplinaService.list().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    });

    this.areaService.list().subscribe((areas) => {
      this.areas = areas;
    });
  }

  formatArea(areas: Area[]): string {
    console.log(areas);
    return areas.map((area) => area.descricao).join(', ')
  }

  save() {
    this.disciplina.areas = this.areasSelecionadas;
    this.disciplinaService.save(this.disciplina).subscribe(
      disciplina => this.disciplinas.push(disciplina),
      error => console.log(error)
    )
  }

  edit() {
    this.updatedDisciplina.areas = this.updatedArea;
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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  openModal(disciplina: Disciplina) {
    this.updatedDisciplina = Object.assign({}, disciplina);
    this.updatedArea = this.updatedDisciplina.areas;
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible =  false;
  }

}
