import { TestBed, inject } from '@angular/core/testing';

import { UpdateListService } from './update-list.service';

describe('UpdateListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateListService]
    });
  });

  it('should be created', inject([UpdateListService], (service: UpdateListService) => {
    expect(service).toBeTruthy();
  }));
});
