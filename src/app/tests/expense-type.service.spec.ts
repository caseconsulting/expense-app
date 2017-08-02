import { TestBed, inject } from '@angular/core/testing';

import { ExpenseTypeService } from './expense-type.service';

describe('ExpenseTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseTypeService]
    });
  });

  it('should be created', inject([ExpenseTypeService], (service: ExpenseTypeService) => {
    expect(service).toBeTruthy();
  }));
});
