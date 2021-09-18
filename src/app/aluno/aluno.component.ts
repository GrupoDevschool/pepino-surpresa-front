import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AlunoService } from '../core/aluno.service';
import { TurmaService } from '../core/turma.service';
import { Aluno } from '../shared/model/Aluno';
import { Turma } from '../shared/model/Turma';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunos: Aluno[];
  aluno: Aluno = {} as Aluno;
  updatedAluno: Aluno = {} as Aluno;
  updatedTurma: Turma[] = [];

  modalIsVisible: boolean = false;

  turmas: Turma[];

  turmaSelecionada  = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private alunoService: AlunoService, private turmaservice: TurmaService) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.turmaSelecionada = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'nome',
      unSelectAllText: 'Limpar seleção',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  reloadData() {
    this.alunoService.list().subscribe((aluno) => {
      this.alunos = aluno;
    })

  this.turmaservice.list().subscribe((turmas) =>{
  this.turmas = turmas;
    }); 

  }

  formatTurma(turmas: Turma[]): string {
    return turmas.map((turma) => turma.nome).join(', ')
  }

  save() {
    this.aluno.turma = this.turmaSelecionada;
    this.alunoService.save(this.aluno).subscribe(
      aluno => this.alunos.push(aluno),
      error => console.log(error)
    )
  }

  edit() {
    this.updatedAluno.turma = this.updatedTurma;
    this.alunoService.edit(this.updatedAluno).subscribe(() => {
      this.reloadData();
      this.closeModal();
      },
      error => {
        console.log(error);
        this.closeModal();
      }
    )
  }

  delete(matricula: number) {
    this.alunoService.delete(matricula).subscribe(() => {
      // a função filter recebe uma função a ser executada em cada elemento do array
      // nesse caso, estou salvando no array de avaliações as avaliações que tem id diferente do que recebi
        this.alunos = this.alunos.filter((element) => element.matricula !== matricula)
      }
    )
  }

  openModal(aluno: Aluno) {
    this.updatedAluno = Object.assign({}, aluno);
    this.updatedTurma = this.updatedAluno.turma;
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
