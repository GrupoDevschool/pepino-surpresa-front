import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Aluno } from '../shared/model/Aluno';
import { Aula } from '../shared/model/Aula';
import { Presenca, PresencaDTO } from '../shared/model/Presenca';
import { AlunoService } from './../core/aluno.service';
import { AulaService } from './../core/aula.service';
import { PresencaService } from './../core/presenca.service';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.component.html',
  styleUrls: ['./presenca.component.css']
})
export class PresencaComponent implements OnInit {

  presencas: Presenca[];
  aulas: Aula[];
  alunos: Aluno[];

  presenca: Presenca;
  alunoSelecionado: Aluno[];
  aulaSelecionada: Aula[];

  updatedPresencas: Presenca[];
  updatedAula: Aula[];

  presencaModalIsVisible: boolean = false;

  dropdownAlunoSettings: IDropdownSettings = {};
  dropdownAulaSettings: IDropdownSettings = {};

  constructor(private PresencaService: PresencaService,
    private AlunoService: AlunoService,
    private AulaService: AulaService) {

    this.dropdownAlunoSettings = {
      singleSelection: true,
      idField: 'matricula',
      textField: 'nome',
      enableCheckAll: false,
      unSelectAllText: 'Limpar seleção',
      allowSearchFilter: true
    };

    this.dropdownAulaSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'assunto',
      enableCheckAll: false,
      unSelectAllText: 'Limpar seleção',
      allowSearchFilter: true
    };
  }

  reloadData() {
    this.PresencaService.list().subscribe((presencas) => {
      this.presencas = presencas;
    });

    this.AlunoService.list().subscribe((alunos) => {
      this.alunos = alunos;
    });

    this.AulaService.list().subscribe((aulas) => {
      this.aulas = aulas;
    });
  }

  save() {
    const newPresenca: PresencaDTO = {
      aulaId: this.aulaSelecionada[0].id,
      alunoId: this.alunoSelecionado[0].matricula,
      horaEntrada: new Date().toISOString()
    }

    this.PresencaService.save(newPresenca).subscribe(
      () => this.reloadData(),
      error => console.log(error)
    )
  }

  delete(id: number, aulaId) {
    this.PresencaService.delete(id).subscribe(
          () => {
            this.reloadData();

            this.PresencaService.listByAula(aulaId).subscribe((presencas) => {
              this.updatedPresencas = Object.assign([], presencas);
            })

          },
          error => console.log(error)
    )
  }

  getAlunoNameByMatricula = (matricula: number): string => {
    return this.alunos.find(aluno => aluno.matricula === matricula).nome;
  }


  openPresencaModal(aula: Aula) {
    this.updatedAula = Array.of(aula);

    this.PresencaService.listByAula(aula.id).subscribe((presencas) => {
      this.updatedPresencas = Object.assign([], presencas);
    })

    this.presencaModalIsVisible = true;
  }

  closePresencaModal() {
    this.presencaModalIsVisible = false;
  }

  ngOnInit(): void {
    this.reloadData();
  }

}
