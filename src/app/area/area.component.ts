import { Component, OnInit } from '@angular/core';
import { AreaService } from '../core/area.service';
import { Area } from './../shared/model/Area';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {


  areas: Area[];
  area: Area = {} as Area;
  updatedArea: Area = {} as Area;

  modalIsVisible: boolean = false;

  constructor(private areaService:AreaService) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.areaService.list().subscribe((areas) => {
      this.areas = areas;
    });
  }

  save() {
    this.areaService.save(this.area).subscribe(
      area => this.areas.push(area),
      error => console.log(error)
    )
  }

  edit() {
    this.areaService.edit(this.updatedArea).subscribe(
      () => {
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
    this.areaService.delete(id).subscribe(() => {
          this.areas = this.areas.filter((element) => element.id !== id)
      }
    )
  }

  openModal(area: Area) {
    this.updatedArea = Object.assign({}, area);
    this.modalIsVisible = this.modalIsVisible = true;
  }

  closeModal() {
    this.modalIsVisible = this.modalIsVisible = false;
  }
}
