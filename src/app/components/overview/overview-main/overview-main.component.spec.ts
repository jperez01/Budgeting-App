import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewMainComponent } from './overview-main.component';

describe('OverviewMainComponent', () => {
  let component: OverviewMainComponent;
  let fixture: ComponentFixture<OverviewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
