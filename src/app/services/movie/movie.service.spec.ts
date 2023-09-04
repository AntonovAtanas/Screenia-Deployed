import { TestBed, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { ENDPOINT } from 'src/app/environments/endpoints';
import { Movie } from 'src/app/interfaces/Movie';
import { Stats } from 'src/app/interfaces/Stats';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  const mockMovies: Movie[] = [
    { 
      title: 'Hobbit',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
      description: 'test description',
      director: 'peter jackson',
      year: 2013
    },
    { 
      title: 'Matrix',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
      description: 'test description',
      director: 'peter',
      year: 2003,
    },
    { 
      title: 'Matrix',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
      description: 'test description',
      director: 'peter',
      year: 2003,
    },
  ];

  const mockMovie: Movie = { 
    title: 'Game of Thrones',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
    description: 'test description',
    director: 'peter stevenson',
    year: 2003,
  };

  const mockUpdatedMovie: Movie = {
    title: 'Game of Thrones: Final',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
    description: 'test description',
    director: 'peter stevenson',
    year: 2022,
  }

  const mockStats: Stats = {
    rating: 4,
    likes: 22
  }

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
        expect(movies.length).toEqual(mockMovies.length);
        expect(movies[1].imageUrl).toEqual(mockMovies[1].imageUrl);
      });

      const req = httpTestingController.expectOne(`${ENDPOINT.movies}/all`);
      expect(req.request.method).toBe('GET');
      
      req.flush(mockMovies)
  });

  it('should add a movie successfully', () => {
    service.addMovie(mockMovie).subscribe(movie => {
      expect(movie).toBeTruthy();
      expect(movie).toEqual(mockMovie);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/add`);
    
    expect(req.request.body).toEqual(mockMovie);
    expect(req.request.method).toBe('POST');
    req.flush(mockMovie);
  });

  it('should get the last 3 movies', () => {
    service.getLastMovies(3).subscribe(movies => {
      expect(movies).toBeTruthy();
      expect(movies.length).toEqual(3);
      expect(movies[1].imageUrl).toEqual(mockMovies[1].imageUrl);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/latest=3`);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockMovies);
  });

  it('should get the most liked movies', () => {
    service.getMostLikedMovies(3).subscribe(movies => {
      expect(movies).toBeTruthy();
      expect(movies.length).toEqual(mockMovies.length);
      expect(movies[1].director).toEqual(mockMovies[1].director);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/most-liked=3`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockMovies);
  });

  it('should get the top movie', () => {
    service.getTopMovie().subscribe(movie => {
      expect(movie).toBeTruthy();
      expect(movie.description).toEqual(mockMovie.description);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/top-movie`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockMovie);
  });

  it('should get a movie', () => {
    service.getMovie('2').subscribe(movie => {
      expect(movie).toBeTruthy();
      expect(movie.description).toEqual(mockMovie.description);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/details/2`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockMovie);
  });

  it('should get a movie stats', () => {
    service.getMovieStats('2').subscribe(movieStats => {
      expect(movieStats).toBeTruthy();
      expect(movieStats.rating).toEqual(mockStats.rating);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/details/2/stats`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockStats);
  });

  it('should add a like to a movie', () => {
    service.likeMovie('2', '123').subscribe(movie => {
      expect(movie).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/details/2/like`);

    expect(req.request.method).toEqual('POST');

    req.flush('like');
  });

  it('should remove a like to a movie', () => {
    service.unlikeMovie('2', '123').subscribe(movie => {
      expect(movie).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/details/2/unlike`);

    expect(req.request.method).toEqual('POST');

    req.flush('like');
  });

  it('should checks if user has liked the movie', () => {
    service.hasUserLiked('2', '123').subscribe(hasLiked => {
      expect(hasLiked).toBeTruthy();
      expect(hasLiked).toEqual(true);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/details/2/like/123`);

    expect(req.request.method).toEqual('GET');

    req.flush(true);
  });

  it('should edit the movie', () => {
    service.editMovie('2', mockUpdatedMovie).subscribe(movie => {
      expect(movie).toBeTruthy();
      expect(movie).toEqual(mockUpdatedMovie);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/edit/2`);

    expect(req.request.method).toEqual('PUT');

    req.flush(mockUpdatedMovie);
  });

  it('should search for a movie', () => {
    service.searchMovie('hobbit').subscribe(movie => {
      expect(movie).toBeTruthy();
      expect(movie[0]).toEqual(mockMovie);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/search/hobbit`);

    expect(req.request.method).toEqual('GET');

    req.flush([mockMovie]);
  });

  it('should delete a movie', () => {
    service.deleteMovie('2').subscribe(movie => {
      expect(movie).toBeTruthy();
      expect(movie).toEqual(mockMovie);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.movies}/delete/2`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockMovie);
  });
});
