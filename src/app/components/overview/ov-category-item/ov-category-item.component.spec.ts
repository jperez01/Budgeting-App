import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvCategoryItemComponent } from './ov-category-item.component';

describe('OvCategoryItemComponent', () => {
  let component: OvCategoryItemComponent;
  let fixture: ComponentFixture<OvCategoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
