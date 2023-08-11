import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ENDPOINT } from 'src/app/environments/endpoints';
import { Review } from 'src/app/interfaces/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewAddedSource = new BehaviorSubject<any>(null);
  reviewAdded$ = this.reviewAddedSource.asObservable();

  constructor(private http: HttpClient) { }

  addReview(movieId: string, reviewData: Review): Observable<any>{
    return this.http.post(`${ENDPOINT.reviews}/${movieId}/reviews`, reviewData);
  };

  hasUserReviewed(movieId:string, userId: string){
    return this.http.get(`${ENDPOINT.reviews}/${movieId}/reviews/${userId}`);
  };

  getAllReviews(movieId: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${ENDPOINT.reviews}/${movieId}/reviews`);
  };

  notifyReviewAdded(review: any) {
    this.reviewAddedSource.next(review);
  };
}
