import { TestBed, inject } from '@angular/core/testing';

import { LoginauthService } from './loginauth.service';

describe('LoginauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginauthService]
    });
  });

  it('should be created', inject([LoginauthService], (service: LoginauthService) => {
    expect(service).toBeTruthy();
  }));
});
