import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { TopMovieComponent } from './top-movie.component';
import { MoviesModule } from 'src/app/features/movies/movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/interfaces/Movie';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopMovieComponent', () => {
  let component: TopMovieComponent;
  let fixture: ComponentFixture<TopMovieComponent>;
  let el: DebugElement;

  let mockMovieService: any;

  let mockTopMovie: Movie = { 
    title: 'Hobbit',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
    description: 'test description',
    director: 'peter jackson',
    year: 2013
  }

  beforeEach(waitForAsync(() => {

    let movieServiceSpy = jasmine.createSpyObj('MovieService', ['getTopMovie']);



    TestBed.configureTestingModule({
      declarations: [TopMovieComponent],
      imports: [MoviesModule, HttpClientTestingModule, SharedModule, RouterTestingModule],
      providers: [
        {provide: MovieService, useValue: movieServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TopMovieComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockMovieService = TestBed.inject(MovieService);
        mockMovieService.getTopMovie.and.returnValue(of(mockTopMovie));

        fixture.detectChanges();
      })

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the top movie', () => {
    // Arrange
    const [movieTitle, movieYear] = el.nativeElement.querySelector('.hero-movie-title').textContent.split(' ');
    const movieDescription = el.nativeElement.querySelector('.hero-movie-description');
    const movieImage = el.nativeElement.querySelector('.hero-movie-image');
    const loadingSpinner = el.nativeElement.querySelector('app-loading-spinner')
    // Act

    // Assert
    expect(movieTitle).toEqual(mockTopMovie.title);
    expect(movieYear).toEqual(`(${mockTopMovie.year})`);
    expect(movieDescription.textContent).toEqual(mockTopMovie.description);
    expect(movieImage.src).toEqual(mockTopMovie.imageUrl);
    expect(component.isLoading).toEqual(false);
    expect(loadingSpinner).toBeFalsy();
  });
});
