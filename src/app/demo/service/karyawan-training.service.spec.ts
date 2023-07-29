import { TestBed } from '@angular/core/testing';

import { KaryawanTrainingService } from './karyawan-training.service';

describe('KaryawanTrainingService', () => {
  let service: KaryawanTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaryawanTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
