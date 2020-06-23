import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvBudgetComponent } from './ov-budget.component';

describe('OvBudgetComponent', () => {
  let component: OvBudgetComponent;
  let fixture: ComponentFixture<OvBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
