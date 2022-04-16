import { TestBed } from '@angular/core/testing';

import { GiftCardTypeService } from './gift-card-type.service';

describe('GiftCardTypeService', () => {
  let service: GiftCardTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftCardTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
