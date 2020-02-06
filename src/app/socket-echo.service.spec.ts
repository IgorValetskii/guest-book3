import { TestBed } from '@angular/core/testing';

import { SocketEchoService } from './socket-echo.service';

describe('SocketEchoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketEchoService = TestBed.get(SocketEchoService);
    expect(service).toBeTruthy();
  });
});
