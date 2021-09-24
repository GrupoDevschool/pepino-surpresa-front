import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AlunoService } from '../core/aluno.service';
import { TurmaService } from '../core/turma.service';
import { Aluno, AlunoDTO } from '../shared/model/Aluno';
import { Turma } from '../shared/model/Turma';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunos: Aluno[];
  alunoDTO: Aluno = {} as Aluno;
  turmaSelecionada: Turma[];
  updatedAlunoDTO: Aluno = {} as Aluno;
  updatedTurma: Turma[];

  modalIsVisible: boolean = false;

  turmas: Turma[];

  dropdownSettings: IDropdownSettings = {};

  constructor(private alunoService: AlunoService, private turmaService: TurmaService) {
  }

  ngOnInit(): void {
    this.reloadData();

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

    this.turmaService.list().subscribe((turmas) => {
      this.turmas = turmas;
    });
  }

  save(){
  const newAluno: AlunoDTO = {
    turmaId: this.turmaSelecionada[0].id,
    nome: this.alunoDTO.nome,
    telefone: this.alunoDTO.telefone,
    email: this.alunoDTO.email,
    observacao: this.alunoDTO.observacao
  }

  console.log(newAluno);

  this.alunoService.save(newAluno).subscribe(
    aluno => {
      this.reloadData();
    },
    error => console.log(error)
  )
}


  edit() {
    const editedAluno: AlunoDTO = {
      turmaId: this.updatedTurma[0].id,
      matricula: this.updatedAlunoDTO.matricula,
      nome:this.updatedAlunoDTO.nome,
      telefone:this.updatedAlunoDTO.telefone,
      email:this.updatedAlunoDTO.email,
      observacao:this.updatedAlunoDTO.observacao
    }

    this.alunoService.edit(editedAluno).subscribe(
      () => {
        this.reloadData();
        this.closeModal();
      },
      error => {
        console.log(error);
        this.closeModal();
      }
    );
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
    this.updatedAlunoDTO = Object.assign({}, aluno);
    this.updatedTurma = Array.of(this.turmas.find(turma => turma.nome === aluno.turma));
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = false;
  }

}
