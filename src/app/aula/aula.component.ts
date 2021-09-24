import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AulaService } from '../core/aula.service';
import { GestorService } from '../core/gestor.service';
import { TurmaService } from '../core/turma.service';
import { Aula } from '../shared/model/Aula';
import { Turma } from '../shared/model/Turma';
import { AulaDTO } from './../shared/model/Aula';
import { Gestor } from './../shared/model/Gestor';

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
  updatedTurma: Turma[];

  modalIsVisible: boolean = false;

  gestores: Gestor[];
  turma: Turma[]

  gestoresSelecionados = []
  turmaSelecionada = []

  dropdownSettings: IDropdownSettings = {};

  constructor(private aulaService: AulaService, private gestorService: GestorService, private turmaService: TurmaService) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.gestoresSelecionados = []
    this.turmaSelecionada = []
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
    });

    this.turmaService.list().subscribe((turma) => {
      this.turma = turma;
    });

  }

  formatGestores(gestores: Gestor[]): string {
    return gestores.map((gestor) => gestor.nome).join(', ')
  }

  save() {
    const newAula: AulaDTO = {
      dataHora: this.aula.dataHora,
      assunto: this.aula.assunto,
      gestores: this.gestoresSelecionados,
      turmaId: this.turma[0].id

    }

    this.aulaService.save(newAula).subscribe(
      avaliacao => this.aulas.push(avaliacao),
      error => console.log(error)
    )
  }

  edit() {
    const editedAula: AulaDTO = {
      id: this.updatedAula.id,
      dataHora: this.updatedAula.dataHora,
      assunto: this.updatedAula.assunto,
      gestores: this.updatedGestores,
      turmaId: this.updatedTurma[0].id
    }

    this.aulaService.edit(editedAula).subscribe(() => {
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
    this.updatedGestores = this.updatedAula.gestoresPresentes;
    this.updatedTurma = Array.of(aula.turma);
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }

}
