import { TestBed } from '@angular/core/testing';

import { PushNotificationsServiceService } from './push-notifications.service.service';

describe('PushNotificationsServiceService', () => {
  let service: PushNotificationsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushNotificationsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
