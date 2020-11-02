import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEntrepriseComponent } from './code-entreprise.component';

describe('CodeEntrepriseComponent', () => {
  let component: CodeEntrepriseComponent;
  let fixture: ComponentFixture<CodeEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
