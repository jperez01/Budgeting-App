import { TestBed } from '@angular/core/testing';

import { BudgetingInfoService } from './budgeting-info.service';

describe('BudgetingInfoService', () => {
  let service: BudgetingInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetingInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
