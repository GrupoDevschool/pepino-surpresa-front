import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaRespostaComponent } from './pergunta-resposta.component';

describe('PerguntaRespostaComponent', () => {
  let component: PerguntaRespostaComponent;
  let fixture: ComponentFixture<PerguntaRespostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerguntaRespostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaRespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
