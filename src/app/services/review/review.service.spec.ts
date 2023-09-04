import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Review } from 'src/app/interfaces/Review';
import { ENDPOINT } from 'src/app/environments/endpoints';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpTestingController: HttpTestingController;

  const mockReviews: Review[] = [
    {
      userId: '1',
      rating: 5,
      review: 'test 1',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
    {
      userId: '2',
      rating: 5,
      review: 'test 1',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
    {
      userId: '3',
      rating: 5,
      review: 'test 1',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
  ];

  const mockReview: Review = {
    userId: '4',
    rating: 5,
    review: 'test 4',
    createdAt: '2023-08-12T15:34:02.954+00:00'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReviewService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new review', () => {
    service.addReview('2', mockReview).subscribe(review => {
      expect(review).toBeTruthy();
      expect(review).toEqual(mockReview);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.reviews}/2/reviews`);

    expect(req.request.method).toEqual('POST');

    expect(req.request.body).toEqual(mockReview);

    req.flush(mockReview)
  });

  it('should checks if user has reviewed', () => {
    service.hasUserReviewed('2', '123').subscribe(hasReviewed => {
      expect(hasReviewed).toBeTruthy();
      expect(hasReviewed).toEqual(true);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.reviews}/2/reviews/123`);

    expect(req.request.method).toEqual('GET');

    req.flush(true);
  });

  it('should get all reviews', () => {
    service.getAllReviews('2').subscribe(reviews => {
      expect(reviews).toBeTruthy();
      expect(reviews).toEqual(mockReviews);
      expect(reviews[1].review).toEqual(mockReviews[1].review);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.reviews}/2/reviews`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockReviews);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
