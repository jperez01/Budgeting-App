import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransDatePickerComponent } from './trans-date-picker.component';

describe('TransDatePickerComponent', () => {
  let component: TransDatePickerComponent;
  let fixture: ComponentFixture<TransDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
