import { Trilha } from './../shared/model/Trilha';
import { Component, OnInit } from '@angular/core';
import { TrilhaService } from '../core/trilha.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.css']
})
export class TrilhaComponent implements OnInit {

  trilhas: Observable<Trilha[]>;
  trilha: Trilha;

  constructor(private trilhaService: TrilhaService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.trilhas = this.trilhaService.listar();
  }

  save() {
    this.trilhaService.salvar(this.trilha).subscribe(
      trilha => console.log(trilha),
      error => console.log(error)
    )
  }

}
