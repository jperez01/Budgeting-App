import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvCategoriesComponent } from './ov-categories.component';

describe('OvCategoriesComponent', () => {
  let component: OvCategoriesComponent;
  let fixture: ComponentFixture<OvCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
