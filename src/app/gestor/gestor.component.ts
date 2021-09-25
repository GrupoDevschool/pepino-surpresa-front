import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GestorService } from '../core/gestor.service';
import { Aula } from '../shared/model/Aula';
import { Gestor } from '../shared/model/Gestor';
import { TipoGestor } from '../shared/model/TipoGestor';
import { AulaService } from './../core/aula.service';
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

  aulas: Aula[];

  aulasSelecionadas = [];

  dropdownSettings: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};

  /*Enum TipoGestor*/
  public tipoGestor = Object.values(TipoGestor);
  gestorSelecionado: string[];
  updatedGestorSelecionado: string[]

  constructor(private gestorService: GestorService, private aulaService: AulaService) { }

  ngOnInit(): void {
    this.reloadData();
    this.aulasSelecionadas = []
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'assunto',
      selectAllText: 'Selecionar todas',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 3,
      allowSearchFilter: true
    },
    this.dropdownSettings2 = {
      singleSelection: true,
      itemsShowLimit: 3,
      allowSearchFilter: false
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

  save() {
    this.gestor.tipo = this.gestorSelecionado[0];

    this.gestorService.save(this.gestor).subscribe(
      gestor => this.gestores.push(gestor),
      error => console.log(error)
    )
  }

  edit() {
    this.gestor.tipo = this.updatedGestorSelecionado[0];

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
    this.updatedGestorSelecionado = [this.updatedGestor.tipo];
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }


}

