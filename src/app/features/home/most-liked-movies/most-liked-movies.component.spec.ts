import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MostLikedMoviesComponent } from './most-liked-movies.component';
import { HomeModule } from '../home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from 'src/app/services/movie/movie.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('MostLikedMoviesComponent', () => {
  let component: MostLikedMoviesComponent;
  let fixture: ComponentFixture<MostLikedMoviesComponent>;
  let el: DebugElement;

  const mockMovies = [
    {
      title: 'Test Movie 1',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 1',
      ownerId: '1',
    },
    {
      title: 'Test Movie 2',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 2',
      ownerId: '2',
    },
    {
      title: 'Test Movie 3',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 3',
      ownerId: '3',
    },
    {
      title: 'Test Movie 4',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 4',
      ownerId: '4',
    },
    {
      title: 'Test Movie 5',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 5',
      ownerId: '5',
    },
    {
      title: 'Test Movie 6',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 6',
      ownerId: '6',
    },
  ]

  let mockMovieService: any;

  beforeEach(waitForAsync(() => {

    let movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMostLikedMovies', 'getMovieStats']);

    TestBed.configureTestingModule({
      declarations: [MostLikedMoviesComponent],
      imports: [HomeModule, HttpClientTestingModule],
      providers: [
        {provide: MovieService, useValue: movieServiceSpy},
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MostLikedMoviesComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockMovieService = TestBed.inject(MovieService);
        mockMovieService.getMostLikedMovies.and.returnValue(of(mockMovies));
        mockMovieService.getMovieStats.and.returnValue(of('stats'));

        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate 6 movies', () => {
    // Arrange
    const movieCards = el.nativeElement.querySelectorAll('app-movie-card');
    // Act

    // Assert
    expect(movieCards.length).toEqual(6)
  });

  it('should populate the movies correctly', () => {
    // Arrange
    const movieCards = el.nativeElement.querySelectorAll('.last-movie-title');
    // Act
    const firstMovie = movieCards[0].children[0].textContent.split('(')[0];
    const secondMovie = movieCards[1].children[0].textContent.split('(')[0];
    const thirdMovie = movieCards[2].children[0].textContent.split('(')[0];
    const fourthMovie = movieCards[3].children[0].textContent.split('(')[0];
    const fiveMovie = movieCards[4].children[0].textContent.split('(')[0];
    const sixMovie = movieCards[5].children[0].textContent.split('(')[0];

    // Assert
    expect(firstMovie.trim()).toEqual(mockMovies[0].title);
    expect(secondMovie.trim()).toEqual(mockMovies[1].title);
    expect(thirdMovie.trim()).toEqual(mockMovies[2].title);
    expect(fourthMovie.trim()).toEqual(mockMovies[3].title);
    expect(fiveMovie.trim()).toEqual(mockMovies[4].title);
    expect(sixMovie.trim()).toEqual(mockMovies[5].title);
  });
});
