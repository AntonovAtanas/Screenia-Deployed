import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { AddReviewMovieComponent } from './add-review-movie.component';
import { MoviesModule } from '../../movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReviewService } from 'src/app/services/review/review.service';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { DebugElement } from '@angular/core';

describe('AddReviewMovieComponent', () => {
  let component: AddReviewMovieComponent;
  let fixture: ComponentFixture<AddReviewMovieComponent>;
  let el: DebugElement;

  let mockReviewService: any;
  let mockUserService: any;
  let mockMovieService: any;

  beforeEach(waitForAsync(() => {

    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['hasUserReviewed', 'addReview', 'notifyReviewAdded']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserId', 'getUsername']);
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovie']);


    TestBed.configureTestingModule({
      declarations: [AddReviewMovieComponent],
      imports: [MoviesModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: ReviewService, useValue: reviewServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
        {provide: MovieService, useValue: movieServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddReviewMovieComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockReviewService = TestBed.inject(ReviewService);
        mockUserService = TestBed.inject(UserService);
        mockMovieService = TestBed.inject(MovieService);

        component.isLogged = true;

        mockUserService.getUserId.and.returnValue(of('82833888'));
        mockReviewService.hasUserReviewed.and.returnValue(of(true));

        // check if user is the owner of the movie
        mockMovieService.getMovie.and.returnValue(of({ownerId: '12333223'}));

        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not show the add review if user is not logged in', () => {
    // Arrange
    component.isLogged = false;
    fixture.detectChanges();
    const message = el.nativeElement.querySelector('.hero-top-movie');
    const addReviewContainer = el.nativeElement.querySelector('.container')

    // Act

    // Assert
    expect(message.textContent).toEqual('Log in to add a review');
    expect(addReviewContainer).toBeFalsy();
  });

  it('does not show the add review if user is the owner', () => {
    // Arrange
    component.isOwner = true;
    fixture.detectChanges();

    const message = el.nativeElement.querySelector('.hero-top-movie');
    const addReviewContainer = el.nativeElement.querySelector('.container')

    // Act

    // Assert
    expect(message.textContent).toEqual('Owner can not add a review');
    expect(addReviewContainer).toBeFalsy();
  });

  it('does not show the add review if user has already reviewed', () => {
    // Arrange
    component.isLogged = true;
    component.hasReviewed = {hasReviewed: true};
    fixture.detectChanges();

    const message = el.nativeElement.querySelector('.hero-top-movie');
    const addReviewContainer: HTMLInputElement = el.nativeElement.querySelector('.container')
    // Act


    // Assert
    expect(message.textContent).toEqual('Already reviewed');
    expect(addReviewContainer).toBeFalsy();
  });

  it('shows validation error if user review is not provided', fakeAsync(() => {
    // Arrange
    component.hasReviewed = {hasReviewed: false};
    component.isLogged = true;
    fixture.detectChanges();
    tick();

    const reviewInput = el.nativeElement.querySelector('#review');
    
    // Act
    reviewInput.dispatchEvent(new Event('input'));
    reviewInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    // Assert
    const validationMessage = el.nativeElement.querySelector('#validation-error');
    expect(validationMessage.textContent.trim()).toEqual('Review content is required!');

  }));

  it('shows validation error if user review is too short', fakeAsync(() => {
    // Arrange
    component.hasReviewed = {hasReviewed: false};
    component.isLogged = true;
    fixture.detectChanges();
    tick();

    const reviewInput = el.nativeElement.querySelector('#review');
    
    // Act
    reviewInput.value = 'D';
    reviewInput.dispatchEvent(new Event('input'));
    reviewInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    // Assert
    const validationMessage = el.nativeElement.querySelector('#validation-error');
    expect(validationMessage.textContent.trim()).toEqual('Review content must be at least 15 characters!');

  }));

  it('shows validation error if user review is too long', fakeAsync(() => {
    // Arrange
    component.hasReviewed = {hasReviewed: false};
    component.isLogged = true;
    fixture.detectChanges();
    tick();

    const reviewInput = el.nativeElement.querySelector('#review');
    
    // Act
    reviewInput.value = 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test';
    reviewInput.dispatchEvent(new Event('input'));
    reviewInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    // Assert
    const validationMessage = el.nativeElement.querySelector('#validation-error');
    expect(validationMessage.textContent.trim()).toEqual('Review content must be no more than 200 characters!');

  }));

  it('adds the new review correctly', fakeAsync(() => {
    // Arrange
    component.hasReviewed = {hasReviewed: false};
    component.isLogged = true;
    fixture.detectChanges();
    tick();

    const reviewInput: HTMLTextAreaElement = el.nativeElement.querySelector('#review');
    const ratingInput: HTMLSelectElement = el.nativeElement.querySelector('#rating');
    const submitBtn = el.nativeElement.querySelector('.btn-main');

    // Act

    reviewInput.value = 'Testing the adding a review option';
    reviewInput.dispatchEvent(new Event('input'));

    ratingInput.value = '5';
    ratingInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const mockForm = <any> {
      value: {
        rating: '5',
        review: 'Testing the adding a review option'
      },
      reset: () => null,
    };
    
    mockReviewService.addReview.and.returnValue(of('review'));

    component.onReview(mockForm);
    tick()
    // Assert

    expect(submitBtn.disabled).toBeFalsy();
    expect(component.hasReviewed.hasReviewed).toEqual(true);
  }));
});
