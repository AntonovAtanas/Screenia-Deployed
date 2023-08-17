import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { PopUpService } from 'src/app/services/pop-up/pop-up.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.css'],
})
export class DetailsMovieComponent implements OnInit, OnDestroy {
  movieSubscription$!: Subscription;
  statsSubscription$!: Subscription;
  allReviewsSubscription$!: Subscription;
  likeMovieSubscription$!: Subscription;
  unLikeMovieSubscription$!: Subscription;
  hasLiked$!: Subscription;
  deleteMovieSubscription$!: Subscription;

  error: string = '';
  isOwner: boolean = false;
  isLogged: boolean = false;

  rating: any;
  likes: number = 0;
  hasLiked: any = { hasLiked: false };

  currentMovie: Movie = {
    title: '',
    imageUrl: '',
    year: 0,
    description: '',
    director: '',
    ownerId: '',
  };

  movieId: string = '';

  constructor(
    private activatedRouting: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private userService: UserService,
    private popUp: PopUpService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRouting.snapshot.params['id'];
    this.isLogged = this.authService.isLogged();
    this.getMovieDetails();
    this.getMovieStats();
    this.reviewAddedListener();
    this.hasUserLiked();
  };

  getMovieDetails() {
    this.movieSubscription$ = this.movieService
      .getMovie(this.movieId)
      .subscribe({
        next: (response) => {
          this.currentMovie = response;

          // check if user is the owner
          this.isOwner = response.ownerId == this.userService.getUserId();
        },
        error: (error) => {
          this.error = error.message;
        },
      });
  };

  getMovieStats() {
    this.statsSubscription$ = this.movieService
      .getMovieStats(this.movieId)
      .subscribe({
        next: (response) => {
          this.likes = response.likes;
          this.rating = response.rating;
        },
        error: (response) => (this.error = response.message),
      });
  };

  reviewAddedListener() {
    this.allReviewsSubscription$ = this.reviewService.reviewAdded$.subscribe(
      () => {
        this.getMovieStats();
      }
    );
  };

  likeMovie() {
    const userId = this.userService.getUserId();

    this.likeMovieSubscription$ = this.movieService
      .likeMovie(this.movieId, userId)
      .subscribe({
        next: (response) => {
          this.hasLiked = { hasLiked: true };
          // this.getMovieStats();
          this.likes += 1;
        },
        error: (response) => (this.error = response.message),
      });
  };

  hasUserLiked() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.hasLiked$ = this.movieService
      .hasUserLiked(this.movieId, userId)
      .subscribe({
        next: (response) => {
          this.hasLiked = response;
        },
        error: (response) => (this.error = response.message),
      });
    }
    
  };

  unlike() {
    const userId = this.userService.getUserId();

    this.unLikeMovieSubscription$ = this.movieService
      .unlikeMovie(this.movieId, userId)
      .subscribe({
        next: (response) => {
          this.getMovieStats();
          this.hasLiked = { hasLiked: false };
        },
        error: (response) => (this.error = response.message),
      });
  };

  onDelete(){
    const message = 'Are you sure you want to delete this movie?';

    const hasConfirmed = this.popUp.onDeletePopUp(message);

    if (hasConfirmed){
      this.deleteMovieSubscription$ = this.movieService.deleteMovie(this.movieId).subscribe({
        next: (response) => this.router.navigate(['/movies/all']),
        error: (response) => this.error = response.message
      })
    }
  }

  ngOnDestroy(): void {
    if (this.movieSubscription$ !== undefined) {
      this.movieSubscription$.unsubscribe();
    }

    if (this.statsSubscription$ !== undefined) {
      this.statsSubscription$.unsubscribe();
    }

    if (this.allReviewsSubscription$ !== undefined) {
      this.allReviewsSubscription$.unsubscribe();
    }

    if (this.hasLiked$ !== undefined) {
      this.hasLiked$.unsubscribe();
    }

    if (this.likeMovieSubscription$ !== undefined) {
      this.likeMovieSubscription$.unsubscribe();
    }

    if (this.unLikeMovieSubscription$ !== undefined) {
      this.unLikeMovieSubscription$.unsubscribe();
    }

    if (this.deleteMovieSubscription$ !== undefined) {
      this.deleteMovieSubscription$.unsubscribe();
    }
  };
}
