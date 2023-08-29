import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMoviesComponent } from './all-movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesModule } from '../movies.module';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AllMoviesComponent', () => {
  let component: AllMoviesComponent;
  let fixture: ComponentFixture<AllMoviesComponent>;
  let el: DebugElement;

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


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMoviesComponent],
      imports: [HttpClientTestingModule, MoviesModule, RouterTestingModule],
      providers: [MovieService]
    });

    fixture = TestBed.createComponent(AllMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all movies', () => {

    component.moviesArr = mockMoviesArray;
    component.isLoading = false;
    fixture.detectChanges();

    const movies = el.children[1].nativeElement.children;

    expect(movies).toBeTruthy();
    expect(movies.length).toEqual(2);

  });

  it('should get the first movie correctly', () => {

    component.moviesArr = mockMoviesArray;

    component.isLoading = false;
    fixture.detectChanges();
    const movies = el.children;

    expect(movies).toBeTruthy();
    expect(el.queryAll(By.css('.last-movie-title'))[0].nativeElement.textContent).toEqual('Hobbit (2013)');
  });

});
