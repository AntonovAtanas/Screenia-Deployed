import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { MoviesModule } from '../movies/movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from 'src/app/services/movie/movie.service';
import { DebugElement } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let el: DebugElement;
  let mockMovieService: any;

  const mockMoviesArray: Movie[] = [
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
    }
  ];

  beforeEach(waitForAsync(() => {

    let movieServiceSpy = jasmine.createSpyObj('MovieService', ['searchMovie', 'newSearch$', 'getMovieStats']);

    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [MoviesModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: MovieService, useValue: movieServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockMovieService = TestBed.inject(MovieService);
        
        mockMovieService.newSearch$ = new BehaviorSubject(null).asObservable();
        mockMovieService.searchMovie.and.returnValue(of(mockMoviesArray));
        mockMovieService.getMovieStats.and.returnValue(of('stats'));

        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the returned movies from searchMovie method', () => {
    const moviesRendered = el.nativeElement.querySelector('.grid-top-rated-movies').children;
    expect(moviesRendered.length).toEqual(mockMoviesArray.length)
  });

  it('should show message if there are no results', () => {
    // Arrange
    component.searchResults = [];
    fixture.detectChanges();
    // Act
    const message = el.nativeElement.querySelector('.text-center');
    // Assert
    expect(message).toBeTruthy();
    expect(message.textContent).toEqual('No results found');
  });

  it('should call search movie method', () => {
    // Arrange
    const getSearchResultsSpy = spyOn(component, 'getSearchResults');
    mockMovieService.newSearch$ = new BehaviorSubject('t').asObservable();
    component.newSearchListener();
    // Act
    fixture.detectChanges();
    // Assert
    expect(component.searchTerm).toEqual('t');
    expect(getSearchResultsSpy).toHaveBeenCalled();
  });

  it('should get the updated results movies', () => {
    // Arrange
    const hobbitMovies = [
      { 
        title: 'Hobbit: An unexpected journey',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
        description: 'test description',
        director: 'peter jackson',
        year: 2013
      },
      { 
        title: 'Hobbit: The desolation of Smaug',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
        description: 'test description',
        director: 'peter',
        year: 2003,
      }
    ]
    component.searchTerm = 'hobbit';
    mockMovieService.searchMovie.and.returnValue(of(hobbitMovies));
    component.getSearchResults();
    // Act
    fixture.detectChanges();
    // Assert
    expect(component.searchResults).toEqual(hobbitMovies);
  });
});
