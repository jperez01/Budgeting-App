import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvAccountsComponent } from './ov-accounts.component';

describe('OvAccountsComponent', () => {
  let component: OvAccountsComponent;
  let fixture: ComponentFixture<OvAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
