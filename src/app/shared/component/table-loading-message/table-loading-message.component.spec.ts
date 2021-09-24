import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLoadingMessageComponent } from './table-loading-message.component';

describe('TableLoadingMessageComponent', () => {
  let component: TableLoadingMessageComponent;
  let fixture: ComponentFixture<TableLoadingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLoadingMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLoadingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
