import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONSTS } from 'src/app/environments/constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-review-movie',
  templateUrl: './add-review-movie.component.html',
  styleUrls: ['./add-review-movie.component.css'],
})
export class AddReviewMovieComponent implements OnInit, OnDestroy {
  hasReviewedSubscription$!: Subscription;
  reviewSubscription$!: Subscription;
  getMovieSubscription$!: Subscription;

  error: string = '';

  movieId: string = '';
  userId: string = '';

  hasReviewed: any = false;
  isOwner: boolean = false;
  isLogged: boolean = false;

  defaultSelectedValue = 1;

  constructor(
    private userService: UserService,
    private activatedRouting: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.hasLiked();
    this.isLogged = this.authService.isLogged();
    this.getIsOwner();
  }

  onReview(reviewForm: NgForm) {
    if (reviewForm.invalid){
      return
    }

    const userId = this.userService.getUserId();
    const review = reviewForm.value.review;
    const rating = Number(reviewForm.value.rating);

    this.reviewSubscription$ = this.reviewService.addReview(this.movieId, {review, rating, userId}).subscribe({
      next: (response) => {
        const username = this.userService.getUsername();
        this.reviewService.notifyReviewAdded({...response, userId: {username: username}});
        this.hasReviewed = {hasReviewed: true};
        reviewForm.reset();
      } ,
      error: (response) => this.error = response.message
    })
  };

  hasLiked(){
    this.movieId = this.activatedRouting.snapshot.params['id'];
    this.userId = this.userService.getUserId();

    this.hasReviewedSubscription$ = this.reviewService.hasUserReviewed(this.movieId, this.userId).subscribe({
      next: (response) => {
        this.hasReviewed = response;
      },
      error: (response) => this.error = response.message
    })
  };

  getIsOwner(){
    this.getMovieSubscription$ = this.movieService.getMovie(this.movieId).subscribe({
      next: (response) => this.isOwner = response.ownerId == this.userId,
      error: (response) => this.error = response.message
    })
  }

  ngOnDestroy(): void {

    if (this.reviewSubscription$ !== undefined){
    this.reviewSubscription$.unsubscribe();
    };

    if (this.hasReviewedSubscription$ !== undefined){
    this.hasReviewedSubscription$.unsubscribe();
    };

    if (this.getMovieSubscription$ !== undefined){
      this.getMovieSubscription$.unsubscribe();
    };
  };
}
