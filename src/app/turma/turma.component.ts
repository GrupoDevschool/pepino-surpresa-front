import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AlunoService } from '../core/aluno.service';
import { TurmaService } from '../core/turma.service';
import { Aluno } from './../shared/model/Aluno';
import { Turma } from './../shared/model/Turma';


@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  turmas: Turma[];
  turma: Turma = {} as Turma;
  updatedTurma: Turma = {} as Turma;
  updatedAlunos: Aluno[] = [];

  modalIsVisible: boolean = false;

  alunos: Aluno[];

  alunosSelecionados = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private turmaService: TurmaService, private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.reloadData();
    this.alunosSelecionados = [];
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
    this.alunoService.list().subscribe((alunos) => {
      this.alunos = alunos;
    })

    this.turmaService.list().subscribe((turmas) => {
      this.turmas = turmas;
    });
  }

  formatDisciplina(alunos: Aluno[]): string {
    return alunos.map((aluno) => aluno.nome).join(', ')
  }

  save() {
    this.turma.alunos = this.alunosSelecionados;
    this.turmaService.save(this.turma).subscribe(
      turma => this.turmas.push(turma),
      error => console.log(error)
    )
  }

  edit() {
    this.updatedTurma.alunos = this.updatedAlunos;
    this.turmaService.edit(this.updatedTurma).subscribe(() => {
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
    this.turmaService.delete(id).subscribe(() => {
        this.turmas = this.turmas.filter((element) => element.id !== id)
      }
    )
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  openModal(turma: Turma) {
    this.updatedTurma = Object.assign({}, turma);
    this.updatedAlunos = this.updatedTurma.alunos;
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
