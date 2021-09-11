import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DisciplinaService } from '../core/disciplina.service';
import { GestorService } from '../core/gestor.service';
import { Gestor } from '../shared/model/Gestor';
import { Disciplina } from './../shared/model/Disciplina';


@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {

  gestores: Gestor[];
  gestor: Gestor = {} as Gestor;
  updatedGestor: Gestor = {} as Gestor;
  updatedDisciplinas: Disciplina[] = []

  modalIsVisible: boolean = false;

  disciplinas: Disciplina[];

  disciplinasSelecionadas = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private gestorService: GestorService, private disciplinaService: DisciplinaService) { }

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

  reloadData(){
    this.disciplinaService.list().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    })

    this.gestorService.list().subscribe((gestores) => {
      this.gestores = gestores;
    });
  }

  formatDisciplina(disciplinas: Disciplina[]): string {
    return disciplinas.map((disciplina) => disciplina.nome).join(', ')
  }

  save() {
    this.gestor.disciplinas = this.disciplinasSelecionadas;
    this.gestorService.save(this.gestor).subscribe(
      gestor => this.gestores.push(gestor),
      error => console.log(error)
    )
  }

  edit() {
    this.updatedGestor.disciplinas = this.updatedDisciplinas;
    this.gestorService.edit(this.updatedGestor).subscribe(() => {
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
    this.gestorService.delete(id).subscribe(() => {
        this.gestores = this.gestores.filter((element) => element.id !== id)
      }
    )
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  openModal(gestor: Gestor) {
    this.updatedGestor = Object.assign({}, gestor);
    this.updatedDisciplinas = this.updatedGestor.disciplinas;
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }


}
