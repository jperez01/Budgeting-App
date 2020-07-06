import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOptionComponent } from './transaction-option.component';

describe('TransactionOptionComponent', () => {
  let component: TransactionOptionComponent;
  let fixture: ComponentFixture<TransactionOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
