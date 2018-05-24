import { TestBed, async, inject } from '@angular/core/testing';

import { ShopauthGuard } from './shopauth.guard';

describe('ShopauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopauthGuard]
    });
  });

  it('should ...', inject([ShopauthGuard], (guard: ShopauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
