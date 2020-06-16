import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvRevenueComponent } from './ov-revenue.component';

describe('OvRevenueComponent', () => {
  let component: OvRevenueComponent;
  let fixture: ComponentFixture<OvRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
