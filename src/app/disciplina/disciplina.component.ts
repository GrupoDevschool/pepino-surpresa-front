import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DisciplinaService } from '../core/disciplina.service';
import { Area } from '../shared/model/Area';
import { Disciplina, DisciplinaDTO } from '../shared/model/Disciplina';
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

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'nome',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  reloadData() {
    this.disciplinaService.list().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
      console.log(this.disciplinas);
    });

    this.areaService.list().subscribe((areas) => {
      this.areas = areas;
    });
  }

  formatArea(areas: Area[]): string {
    console.log(areas);
    return areas.map((area) => area.nome).join(', ')
  }

  save() {
    const newDisciplina: DisciplinaDTO = {
      nome: this.disciplina.nome,
      area: this.disciplina.area = this.areasSelecionadas[0].id
    }

    this.disciplinaService.save(newDisciplina).subscribe(
      disciplina => this.disciplinas.push(disciplina),
      error => console.log(error)
    )
  }

  edit() {
    const newDisciplina: DisciplinaDTO = {
      id: this.updatedDisciplina.id,
      nome: this.disciplina.nome,
      area: this.disciplina.area = this.areasSelecionadas[0].id
    }

    this.disciplinaService.edit(newDisciplina).subscribe(
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
    console.log(this.updatedDisciplina);
    this.updatedArea = Array.of(this.updatedDisciplina.area);
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible =  false;
  }

}
