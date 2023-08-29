import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import { MoviesModule } from '../movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let el: DebugElement;

  let movieService: any;
  let router: Router;

  beforeEach(waitForAsync(() => {

    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['addMovie'])

    TestBed.configureTestingModule({
      declarations: [AddMovieComponent],
      imports: [MoviesModule, HttpClientTestingModule],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddMovieComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        movieService = TestBed.inject(MovieService);
        router = TestBed.inject(Router);

        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // validation errors case
  it('should disable the submit button & show validation error if inputs are too short', () => {
    // Arrange
    const titleInput: HTMLInputElement = el.nativeElement.querySelector('#title');
    const directorInput: HTMLInputElement = el.nativeElement.querySelector('#director');
    const descriptionInput: HTMLInputElement = el.nativeElement.querySelector('#description');
    
    // Act
    titleInput.value = 'D';
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));

    directorInput.value = 'D';
    directorInput.dispatchEvent(new Event('input'));
    directorInput.dispatchEvent(new Event('blur'));

    descriptionInput.value = 'D';
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const button = el.nativeElement.querySelector('.btn-main');

    const validationError = el.nativeElement.querySelectorAll('#validation-error');

    //Assert
    expect(validationError[0]).toBeTruthy();
    expect(validationError[0].textContent.trim()).toEqual('Movie title is less than 4 characters!');

    expect(validationError[1]).toBeTruthy();
    expect(validationError[1].textContent.trim()).toEqual('Movie director is less than 4 characters!');

    expect(validationError[2]).toBeTruthy();
    expect(validationError[2].textContent.trim()).toEqual('Movie description should be minimum 20 characters.');

    expect(button.disabled).toBeTruthy();
  });

  it('should disable the submit button & show validation error any input is not filled', () => {
    // Arrange
    const titleInput: HTMLInputElement = el.nativeElement.querySelector('#title');
    const directorInput: HTMLInputElement = el.nativeElement.querySelector('#director');
    const descriptionInput: HTMLInputElement = el.nativeElement.querySelector('#description');
    const imageUrlInput: HTMLInputElement = el.nativeElement.querySelector('#imageUrl');
    const yearInput: HTMLInputElement = el.nativeElement.querySelector('#year');

    
    // Act
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));

    directorInput.dispatchEvent(new Event('input'));
    directorInput.dispatchEvent(new Event('blur'));

    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));

    imageUrlInput.dispatchEvent(new Event('input'));
    imageUrlInput.dispatchEvent(new Event('blur'));

    yearInput.dispatchEvent(new Event('input'));
    yearInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const button = el.nativeElement.querySelector('.btn-main');

    const validationError = el.nativeElement.querySelectorAll('#validation-error');

    //Assert
    expect(validationError[0]).toBeTruthy();
    expect(validationError[0].textContent.trim()).toEqual('Movie title is required!');

    expect(validationError[1]).toBeTruthy();
    expect(validationError[1].textContent.trim()).toEqual('Movie director is required!');
    
    expect(validationError[2]).toBeTruthy();
    expect(validationError[2].textContent.trim()).toEqual('Release year is required!');

    expect(validationError[3]).toBeTruthy();
    expect(validationError[3].textContent.trim()).toEqual('Image url is required!');

    expect(validationError[4]).toBeTruthy();
    expect(validationError[4].textContent.trim()).toEqual('Movie description is required!');

    expect(button.disabled).toBeTruthy();
  });

  it('should disable the submit button & show validation error if characters exceed the limit', () => {
    // Arrange
    const titleInput: HTMLInputElement = el.nativeElement.querySelector('#title');
    const directorInput: HTMLInputElement = el.nativeElement.querySelector('#director');
    const descriptionInput: HTMLInputElement = el.nativeElement.querySelector('#description');
    
    // Act
    titleInput.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit tellus.'
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));

    directorInput.value = 'Lorem ipsum dolor sit amet laoreet.'
    directorInput.dispatchEvent(new Event('input'));
    directorInput.dispatchEvent(new Event('blur'));

    descriptionInput.value = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ante magna, feugiat eget orci in, vulputate tincidunt urna. Quisque quis libero dignissim, sollicitudin est cursus, maximus velit. Nunc est nisl, pulvinar at porta quis, lacinia at urna. Donec eget tempor quam. Integer commodo lectus felis, vel dignissim tortor sollicitudin non. Aenean sed risus tincidunt, gravida libero ac, efficitur felis. Sed blandit auctor magna, id malesuada nunc elementum non. Aliquam urna massa, vestibulum vel commodo non, rhoncus non neque. Cras eget malesuada nulla. In congue lectus eget ipsum congue, in scelerisque ligula auctor. Maecenas malesuada dolor libero. Quisque accumsan tellus auctor sagittis fermentum. Duis malesuada ut mauris ac tristique. In hac habitasse platea dictumst. Pellentesque ultricies tincidunt varius. Integer diam ante, rhoncus ac massa nec, maximus pharetra lectus. Nam convallis metus in odio rutrum egestas. Suspendisse in justo vitae erat tristique suscipit. Etiam et sodales leo. Nullam at tellus fringilla, auctor nunc ac, sagittis ligula. Ut quis dui non augue tincidunt vestibulum. Proin condimentum faucibus fringilla. Phasellus mollis non enim non egestas. Morbi urna sapien, tincidunt quis neque et, efficitur gravida libero. Integer risus sem, vehicula nec nulla sed, varius eleifend mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque vehicula augue tellus, et porttitor mi accumsan eget. Morbi blandit est molestie dolor condimentum viverra. Donec dignissim felis nec ipsum porta dignissim. Curabitur lobortis iaculis ligula quis tristique. Maecenas id sodales orci, eget volutpat nisi. Mauris ultricies erat a et.`
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const button = el.nativeElement.querySelector('.btn-main');

    const validationError = el.nativeElement.querySelectorAll('#validation-error');

    //Assert
    expect(validationError[0]).toBeTruthy();
    expect(validationError[0].textContent.trim()).toEqual('Movie title should not exceed 60 characters!');

    expect(validationError[1]).toBeTruthy();
    expect(validationError[1].textContent.trim()).toEqual('Movie director should not exceed 30 characters!');
    
    expect(validationError[2]).toBeTruthy();
    expect(validationError[2].textContent.trim()).toEqual('Movie description should be maximum 1500 characters.');

    expect(button.disabled).toBeTruthy();
  });

  it('should disable the submit button & show validation error if year is invalid', () => {
    // Arrange
    const yearInput: HTMLInputElement = el.nativeElement.querySelector('#year');
    
    // Act
    yearInput.value = '2999'
    yearInput.dispatchEvent(new Event('input'));
    yearInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const button = el.nativeElement.querySelector('.btn-main');

    const validationError = el.nativeElement.querySelectorAll('#validation-error');

    //Assert
    expect(validationError[0]).toBeTruthy();
    expect(validationError[0].textContent.trim()).toEqual('Invalid movie release year!');

    expect(button.disabled).toBeTruthy();
  });

  it('should disable the submit button & show validation error if image url is invalid', () => {
    // Arrange
    const imageUrlInput: HTMLInputElement = el.nativeElement.querySelector('#imageUrl');
    
    // Act
    imageUrlInput.value = 'www.google.com'
    imageUrlInput.dispatchEvent(new Event('input'));
    imageUrlInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const button = el.nativeElement.querySelector('.btn-main');

    const validationError = el.nativeElement.querySelectorAll('#validation-error');

    //Assert
    expect(validationError[0]).toBeTruthy();
    expect(validationError[0].textContent.trim()).toEqual('Invalid movie image url!');

    expect(button.disabled).toBeTruthy();
  });

  // positive case

  it('should submit correctly new movie and redirect to home', fakeAsync(() => {
    // Arrange
    const titleInput: HTMLInputElement = el.nativeElement.querySelector('#title');
    const directorInput: HTMLInputElement = el.nativeElement.querySelector('#director');
    const descriptionInput: HTMLInputElement = el.nativeElement.querySelector('#description');
    const imageUrlInput: HTMLInputElement = el.nativeElement.querySelector('#imageUrl');
    const yearInput: HTMLInputElement = el.nativeElement.querySelector('#year');

    const navigateSpy = spyOn(router, 'navigate');

    // Act
    titleInput.value = 'Test Movie';
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));

    directorInput.value = 'Test Director';
    directorInput.dispatchEvent(new Event('input'));
    directorInput.dispatchEvent(new Event('blur'));

    descriptionInput.value = 'Testing the movie description validation';
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));

    imageUrlInput.value = 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg';
    imageUrlInput.dispatchEvent(new Event('input'));
    imageUrlInput.dispatchEvent(new Event('blur'));

    yearInput.value = '2021';
    yearInput.dispatchEvent(new Event('input'));
    yearInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const validationError = el.nativeElement.querySelector('#validation-error');
    const button = el.nativeElement.querySelector('.btn-main');
    
    const movieData = {
      title: 'Test Movie', 
      description: 'Testing the movie description validation', 
      director: 'Test director', 
      year: 2022, 
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg', 
      ownerId: '82833888'
    };

    const mockForm = <NgForm>{
      value: movieData
    };

    movieService.addMovie.and.returnValue(of(movieData));

    component.onCreate(mockForm);
    tick();

    //Assert
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(validationError).toBeNull();
    expect(button.disabled).toBeFalsy();

  }));

});
