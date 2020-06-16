import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvExpensesComponent } from './ov-expenses.component';

describe('OvExpensesComponent', () => {
  let component: OvExpensesComponent;
  let fixture: ComponentFixture<OvExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
