import { TestBed } from '@angular/core/testing';

import { CustomBouquetService } from './custom-bouquet.service';

describe('CustomBouquetService', () => {
  let service: CustomBouquetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBouquetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
