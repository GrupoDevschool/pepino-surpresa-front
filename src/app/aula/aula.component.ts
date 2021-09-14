import { Component, OnInit } from '@angular/core';
import { AulaService } from '../core/aula.service';
import { Aula } from '../shared/model/Aula';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  aulas: Aula[];
  aula: Aula = {} as Aula;
  updatedAula: Aula = {} as Aula;

  modalIsVisible: boolean = false;

  constructor(private aulaService: AulaService) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.aulaService.list().subscribe((aulas) => {
      this.aulas = aulas;
    });
  }

  save() {
    this.aulaService.save(this.aula).subscribe(
      avaliacao => this.aulas.push(avaliacao),
      error => console.log(error)
    )
  }

  edit() {
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

  openModal(aula: Aula) {
    this.updatedAula = Object.assign({}, aula);
    this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }

}
