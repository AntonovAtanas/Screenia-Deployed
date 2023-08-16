import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/interfaces/Review';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-all-reviews-movie',
  templateUrl: './all-reviews-movie.component.html',
  styleUrls: ['./all-reviews-movie.component.css'],
  animations: [
    trigger('review1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0.3,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ])
      
    ])
  ]
})
export class AllReviewsMovieComponent implements OnInit, OnDestroy {

  subscription$!: Subscription;
  allReviewsSubscription!: Subscription;
  allReviews: Review[] = [];

  constructor(private reviewService: ReviewService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.reviewAddedListener();
    this.getReviews();
  };

  getReviews(){
    const movieId = this.activatedRoute.snapshot.params['id'];
    this.subscription$ = this.reviewService.getAllReviews(movieId).subscribe({
      next: (response) => this.allReviews = response,
      error: (response) => console.log('error', response.message)
    })
  };

  reviewAddedListener(){
    this.allReviewsSubscription = this.reviewService.reviewAdded$.subscribe({
      next: (review) => {
        if (review) {
          this.allReviews.push(review);
        }
      }
    });
  }

  numSequence(n: number) {
    return Array(n);
  }

  ngOnDestroy(): void {
    if (this.subscription$ !== undefined){
      this.subscription$.unsubscribe();
    };

    if (this.allReviewsSubscription !== undefined){
      this.allReviewsSubscription.unsubscribe();
    }
  }
}
