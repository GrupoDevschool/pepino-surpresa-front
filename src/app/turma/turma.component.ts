import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  loadingData: boolean = false;
  failToLoadData: boolean = false;
  requestLoading: boolean = false;

  modalIsVisible: boolean = false;

  constructor(private turmaService: TurmaService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.reloadData();
  }

  reloadData() {
    this.loadingData = true;
    this.turmaService.list().subscribe(
      turmas => {
        this.turmas = turmas;
        this.loadingData = false;
      },
      error => {
        this.showError(error.message)
        this.loadingData = true;
        this.failToLoadData = true;
      }
    );

    console.log(this.loadingData);
  }

  showSuccess() {
    this.toastr.success('Turma salva com sucesso!');
  }

  showError(message: string) {
    this.toastr.error(message, 'Erro');
  }

  formatDisciplina(alunos: Aluno[]): string {
    return alunos.map((aluno) => aluno.nome).join(', ')
  }

  save() {
    this.requestLoading = true;
    this.turmaService.save(this.turma).subscribe(
      () => {
        this.showSuccess();
        this.reloadData();
        this.requestLoading = false;
      },
      error => {
        this.showError(error.message)
        this.requestLoading = false;
      }
    )
  }

  edit() {
    this.turmaService.edit(this.updatedTurma).subscribe(() => {
        this.reloadData();
        this.closeModal();
        this.showSuccess();
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

  openModal(turma: Turma) {
    this.updatedTurma = Object.assign({}, turma);
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
