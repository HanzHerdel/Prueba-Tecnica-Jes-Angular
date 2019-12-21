import { TestBed } from '@angular/core/testing';

import { ApiConectionService } from './api-conection.service';

describe('ApiConectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiConectionService = TestBed.get(ApiConectionService);
    expect(service).toBeTruthy();
  });
});
