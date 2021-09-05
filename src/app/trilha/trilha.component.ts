import { Trilha } from './../shared/model/Trilha';
import { Component, OnInit } from '@angular/core';
import { TrilhaService } from '../core/trilha.service';


@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.css']
})
export class TrilhaComponent implements OnInit {

  trilhas: Trilha[];
  trilha: Trilha = {} as Trilha;

  constructor(private trilhaService: TrilhaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.trilhaService.list().subscribe((trilhas) => {
      this.trilhas = trilhas;
    });
  }

  save() {
    this.trilhaService.save(this.trilha).subscribe(
      trilha => this.trilhas.push(trilha),
      error => console.log(error)
    )
  }

  edit(trilha: Trilha) {
    this.trilhaService.edit(trilha).subscribe(() => {
      const index = this.trilhas.findIndex(a => a.id === trilha.id);
      if (index !== -1) {
        this.trilhas[index] = trilha;
      }
    })
  }

  delete(id: number) {
    this.trilhaService.delete(id).subscribe(() => {
        this.trilhas = this.trilhas.filter((element) => element.id !== id)
      }
    )
  }

}
