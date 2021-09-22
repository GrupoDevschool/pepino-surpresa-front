import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-loading-message',
  templateUrl: './table-loading-message.component.html',
  styleUrls: ['./table-loading-message.component.css']
})
export class TableLoadingMessageComponent {

  constructor() { }

  @Input()
  entityName: string;

  @Input()
  loadingData: boolean;

  @Input()
  failToLoadData: boolean;

}
