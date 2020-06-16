import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvAccountComponent } from './ov-account.component';

describe('OvAccountComponent', () => {
  let component: OvAccountComponent;
  let fixture: ComponentFixture<OvAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
