import { TestBed } from '@angular/core/testing';

import { PremadeBouquetService } from './premade-bouquet.service';

describe('PremadeBouquetService', () => {
  let service: PremadeBouquetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremadeBouquetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
