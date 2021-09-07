import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DisciplinaService } from '../core/disciplina.service';
import { TrilhaService } from '../core/trilha.service';
import { Disciplina } from './../shared/model/Disciplina';
import { Trilha } from './../shared/model/Trilha';


@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.css']
})
export class TrilhaComponent implements OnInit {

  trilhas: Trilha[];
  trilha: Trilha = {} as Trilha;
  updatedTrilha: Trilha = {} as Trilha;
  updatedDisciplinas: Disciplina[] = [];

  modalIsVisible: boolean = false;

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

  edit() {
    this.updatedTrilha.disciplinas = this.updatedDisciplinas;
    this.trilhaService.edit(this.updatedTrilha).subscribe(() => {
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

  openModal(trilha: Trilha) {
    this.updatedTrilha = Object.assign({}, trilha);
    this.updatedDisciplinas = this.updatedTrilha.disciplinas;
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
