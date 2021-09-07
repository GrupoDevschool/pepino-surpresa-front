import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../core/aluno.service';
import { Aluno } from '../shared/model/Aluno';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunos: Aluno[];
  aluno: Aluno = {} as Aluno;
  updatedAluno: Aluno = {} as Aluno;

  modalIsVisible: boolean = false;

  constructor(private alunoService: AlunoService) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.alunoService.list().subscribe((aluno) => {
      this.alunos = aluno;
    });
  }


  save() {
    this.alunoService.save(this.aluno).subscribe(
      aluno => this.alunos.push(aluno),
      error => console.log(error)
    )
  }

  edit() {
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
    this.updatedAluno = aluno;
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
