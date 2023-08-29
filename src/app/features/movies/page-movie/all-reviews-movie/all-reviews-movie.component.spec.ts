import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { AllReviewsMovieComponent } from './all-reviews-movie.component';
import { MoviesModule } from '../../movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Review } from 'src/app/interfaces/Review';
import { ReviewService } from 'src/app/services/review/review.service';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AllReviewsMovieComponent', () => {
  let component: AllReviewsMovieComponent;
  let fixture: ComponentFixture<AllReviewsMovieComponent>;
  let el: DebugElement;

  const allReviews: Review[] = [
    {
      rating: 5,
      review: 'Test the all reviews component',
      createdAt: '2023-08-18T09:33:52.462+00:00',
      userId: {
        username: 'test username'
      }
    },
    {
      rating: 3,
      review: 'Test the all reviews component',
      createdAt: '2022-08-18T09:33:52.462+00:00',
      userId: {
        username: 'test user'
      }
    },
  ];

  let reviewService: any;

  beforeEach(waitForAsync(() => {

    let mockReviewService = jasmine.createSpyObj('ReviewService', ['getAllReviews', 'reviewAdded$'])

    TestBed.configureTestingModule({
      declarations: [AllReviewsMovieComponent],
      imports: [MoviesModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {provide: ReviewService, useValue: mockReviewService}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AllReviewsMovieComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        reviewService = TestBed.inject(ReviewService);

        reviewService.reviewAdded$ = new BehaviorSubject<any>(null).asObservable();

        reviewService.getAllReviews.and.returnValue(of(allReviews));

        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all reviews correctly', fakeAsync(() => {
    // Arrange
    const reviewsList = el.nativeElement.querySelector('#reviews-list');
    const reviewsTitle = el.nativeElement.querySelector('.hero-top-movie');

    // Act

    // Assert
    expect(reviewsList.children.length).toEqual(2);
    expect(reviewsTitle.textContent).toEqual('Reviews');

  }));

  it('should display no reviews if there are none', fakeAsync(() => {
    // Arrange
    const reviewsTitle = el.nativeElement.querySelector('.hero-top-movie');
    const reviewsList = el.nativeElement.querySelector('#reviews-list');

    // Act
    component.allReviews = [];
    fixture.detectChanges();

    // Assert
    expect(reviewsList.children.length).toEqual(0);
    expect(reviewsTitle.textContent).toEqual('No reviews yet')
  }));
});
