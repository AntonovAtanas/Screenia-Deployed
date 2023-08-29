import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { LastMoviesComponent } from './last-movies.component';
import { HomeModule } from '../../home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from 'src/app/services/movie/movie.service';
import { DebugElement } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { of } from 'rxjs';

describe('LastMoviesComponent', () => {
  let component: LastMoviesComponent;
  let fixture: ComponentFixture<LastMoviesComponent>;
  let el: DebugElement;

  let mockMovieService: any;

  beforeEach(waitForAsync(() => {

    let movieServiceSpy = jasmine.createSpyObj('MovieService', ['getLastMovies']);
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
      },
      { 
        title: 'Matrix',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
        description: 'test description',
        director: 'peter',
        year: 2003,
      },
    ];

    TestBed.configureTestingModule({
      declarations: [LastMoviesComponent],
      imports: [HomeModule, HttpClientTestingModule],
      providers: [
        {provide: MovieService, useValue: movieServiceSpy}
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LastMoviesComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;

      mockMovieService = TestBed.inject(MovieService);

      mockMovieService.getLastMovies.and.returnValue(of(mockMoviesArray));

      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the last 3 movies & hide the loading spinner', fakeAsync(() => {
    // Arrange
    const lastMoviesDiv = el.nativeElement.querySelector('.last-3-movies');
    // Act
    tick();
    // Assert
    expect(component.isLoading).toEqual(false);
    expect(lastMoviesDiv.children.length).toEqual(3);
  }));
});
