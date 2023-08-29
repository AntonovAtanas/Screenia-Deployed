import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { ENDPOINT } from 'src/app/environments/endpoints';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all movies', () => {
      service.getAllMovies().subscribe(movies => {
        expect(movies).toBeTruthy();
        
        expect(movies.length).toBeGreaterThan(0);
      });

      const req = httpTestingController.expectOne(`${ENDPOINT.movies}/all`);
      expect(req.request.method).toBe('GET');
  });
});
