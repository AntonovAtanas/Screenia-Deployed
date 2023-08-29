import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { EditMovieComponent } from './edit.component';
import { MoviesModule } from '../movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

describe('EditComponent', () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;

  let el: DebugElement;
  let movieService: any;
  let userService: any;
  let router: Router;

  const initialMovie = {
    title: 'Test Movie', 
    description: 'Testing the movie description validation', 
    director: 'Test director', 
    year: 2022, 
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg', 
    ownerId: '82833888'
  };

  const userId = '82833888';
  const movieId = '123456789';

  beforeEach(waitForAsync(() => {

    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['editMovie', 'getMovie', 'getMovieStats']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserId']);

    TestBed.configureTestingModule({
      declarations: [EditMovieComponent],
      imports: [MoviesModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: MovieService, useValue: movieServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EditMovieComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        movieService = TestBed.inject(MovieService);
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);

        userService.getUserId.and.returnValue(userId);
        movieService.getMovie.and.returnValue(of(initialMovie));
        fixture.detectChanges();

      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the movie correctly', fakeAsync(() => {
      // Arrange
      const titleInput: HTMLInputElement = el.nativeElement.querySelector('#title');
      const directorInput: HTMLInputElement = el.nativeElement.querySelector('#director');
      const descriptionInput: HTMLInputElement = el.nativeElement.querySelector('#description');
      const imageUrlInput: HTMLInputElement = el.nativeElement.querySelector('#imageUrl');
      const yearInput: HTMLInputElement = el.nativeElement.querySelector('#year');
      // Act


      // Assert
      expect(titleInput.value).toEqual(initialMovie.title);
      expect(directorInput.value).toEqual(initialMovie.director);
      expect(descriptionInput.value).toEqual(initialMovie.description);
      expect(imageUrlInput.value).toEqual(initialMovie.imageUrl);
      expect(Number(yearInput.value)).toEqual(initialMovie.year);
  }));

  it('should edit the movie correctly', fakeAsync(() => {
    // Arrange
    const directorInput: HTMLInputElement = el.nativeElement.querySelector('#director');
    const navigateSpy = spyOn(router, 'navigate');
    const button = el.nativeElement.querySelector('.btn-main');

    // Act
    directorInput.value = 'Updated Director';

    const movieData = {
      title: 'Test Movie', 
      description: 'Testing the movie description validation', 
      director: directorInput.value, 
      year: 2022, 
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg', 
      ownerId: '82833888'
    };

    const mockForm = <NgForm>{
      value: movieData
    };

    movieService.editMovie.and.returnValue(of(movieData));
    movieService.getMovieStats.and.returnValue(of({likes: 2, rating: 5}));
    
    component.movieId = movieId;
    component.onEdit(mockForm);

    tick();

    // Assert
    expect(navigateSpy).toHaveBeenCalledWith([`/movies/details/${movieId}`]);
    expect(directorInput.value).toEqual('Updated Director');
    expect(button.disabled).toBeFalsy();
  }))
});
