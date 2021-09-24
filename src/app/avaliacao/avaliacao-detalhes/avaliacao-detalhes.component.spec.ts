import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoDetalhesComponent } from './avaliacao-detalhes.component';

describe('AvaliacaoDetalhesComponent', () => {
  let component: AvaliacaoDetalhesComponent;
  let fixture: ComponentFixture<AvaliacaoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
