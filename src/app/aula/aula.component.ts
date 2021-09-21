import { Gestor } from './../shared/model/Gestor';
import { Component, OnInit } from '@angular/core';
import { AulaService } from '../core/aula.service';
import { Aula } from '../shared/model/Aula';
import { GestorService } from '../core/gestor.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  aulas: Aula[];
  aula: Aula = {} as Aula;
  updatedAula: Aula = {} as Aula;
  updatedGestores: Gestor[] = []

  modalIsVisible: boolean = false;

  gestores: Gestor[];
  gestoresSelecionados = []

  dropdownSettings: IDropdownSettings = {};

  constructor(private aulaService: AulaService, private gestorService: GestorService) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.gestoresSelecionados = []
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  reloadData() {
    this.aulaService.list().subscribe((aulas) => {
      this.aulas = aulas;
    });

    this.gestorService.list().subscribe((gestores) => {
      this.gestores = gestores;
    })
  }

  formatGestores(gestores: Gestor[]): string {
    return gestores.map((gestor) => gestor.nome).join(', ')
  }

  save() {
    this.aula.gestores = this.gestoresSelecionados
    this.aulaService.save(this.aula).subscribe(
      avaliacao => this.aulas.push(avaliacao),
      error => console.log(error)
    )
  }

  edit() {
    this.updatedAula.gestores = this.updatedGestores
    this.aulaService.edit(this.updatedAula).subscribe(() => {
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
    this.aulaService.delete(id).subscribe(() => {
      // a função filter recebe uma função a ser executada em cada elemento do array
      // nesse caso, estou salvando no array de avaliações as avaliações que tem id diferente do que recebi
        this.aulas = this.aulas.filter((element) => element.id !== id)
      }
    )
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  openModal(aula: Aula) {
    this.updatedAula = Object.assign({}, aula);
    this.updatedGestores = this.updatedAula.gestores;
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }

}
