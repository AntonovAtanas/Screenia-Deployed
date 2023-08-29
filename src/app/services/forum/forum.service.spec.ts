import { TestBed } from '@angular/core/testing';

import { ForumService } from './forum.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForumService', () => {
  let service: ForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
