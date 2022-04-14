import { TestBed } from '@angular/core/testing';

import { FlowerTypeService } from './flower-type.service';

describe('FlowerTypeService', () => {
  let service: FlowerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowerTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
