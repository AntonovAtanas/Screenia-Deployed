import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @Input() movie!: Movie;

  currentMovieSubscription$!: Subscription;

  rating: any;
  likes: number = 0;

  error: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.currentMovieSubscription$ = this.movieService
      .getMovieStats(this.movie._id!)
      .subscribe({
        next: (response) =>{
          this.likes = response.likes;
          this.rating = response.rating
        } ,
        error: (response) => (this.error = response.message),
      });
  };

  ngOnDestroy(): void {
    if (this.currentMovieSubscription$ !== undefined) {
      this.currentMovieSubscription$.unsubscribe();
    }
  };
}
