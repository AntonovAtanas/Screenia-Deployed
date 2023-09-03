import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { SharedModule } from '../shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { of } from 'rxjs';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let el: DebugElement;
  let mockMovieService: any;
  let mockMovie = {
    title: 'Hobbit',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
    description: 'test description',
    director: 'peter jackson',
    year: 2013,
    _id: '123123123'
  }

  beforeEach(waitForAsync(() => {
    let spyMovieService = jasmine.createSpyObj('MovieService', ['getMovieStats']);
    TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: MovieService, useValue: spyMovieService}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MovieCardComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        mockMovieService = TestBed.inject(MovieService);
        mockMovieService.getMovieStats.and.returnValue(of({likes: 5, rating: 4}));

        component.movie = mockMovie;
        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the movie correctly', () => {
    // Arrange
    const [movieTitle, movieYear] = el.nativeElement.querySelector('.last-movie-title p').textContent.split(' ');
    const movieImageUrl = el.nativeElement.querySelector('.card-img');
    const movieLikes = el.nativeElement.querySelector('.card-total-likes').textContent;
    const movieRating = el.nativeElement.querySelector('.card-total-rating').textContent;

    // Act
    
    // Assert
    expect(movieTitle).toEqual(mockMovie.title);
    expect(movieImageUrl.src).toEqual(mockMovie.imageUrl);
    expect(movieYear).toEqual(`(${mockMovie.year})`);
    expect(Number(movieLikes)).toEqual(component.likes);
    expect(Number(movieRating)).toEqual(component.rating);
  });
});
