import { AulaService } from './../core/aula.service';
import { TurmaService } from './../core/turma.service';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DisciplinaService } from '../core/disciplina.service';
import { GestorService } from '../core/gestor.service';
import { Gestor } from '../shared/model/Gestor';
import { Turma } from '../shared/model/Turma';
import { Disciplina } from './../shared/model/Disciplina';
import { Aula } from '../shared/model/Aula';


@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {

  gestores: Gestor[];
  gestor: Gestor = {} as Gestor;
  updatedGestor: Gestor = {} as Gestor;
  updatedAulas: Aula[] = []


  modalIsVisible: boolean = false;

  tipos: string[] = ["professor", "orientador"]
  aulas: Aula[];

  tiposSelecionados = []
  aulasSelecionadas = [];

  dropdownSettings: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};

  constructor(private gestorService: GestorService, private aulaService: AulaService) { }

  ngOnInit(): void {
    this.reloadData();
    this.tiposSelecionados = []
    this.aulasSelecionadas = []
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Selecionar todas',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 3,
      allowSearchFilter: true
    },
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'id',
      textField: 'nome',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  reloadData(){
    this.aulaService.list().subscribe((aulas) => {
      this.aulas = aulas;
    });

    this.gestorService.list().subscribe((gestores) => {
      this.gestores = gestores;
    });
  }

  formatAulas(aulas: Aula[]): string {
    return aulas.map((aula) => aula.assunto).join(', ')
  }

  save() {
    this.gestor.aulas = this.aulasSelecionadas;
    this.gestorService.save(this.gestor).subscribe(
      gestor => this.gestores.push(gestor),
      error => console.log(error)
    )
  }

  edit() {
    this.updatedGestor.aulas = this.updatedAulas;
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
    this.updatedAulas = this.updatedGestor.aulas;
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }


}

