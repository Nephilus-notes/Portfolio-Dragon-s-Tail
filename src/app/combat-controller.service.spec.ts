import { TestBed } from '@angular/core/testing';

import { CombatControllerService } from './combat-controller.service';

describe('CombatControllerService', () => {
  let service: CombatControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
