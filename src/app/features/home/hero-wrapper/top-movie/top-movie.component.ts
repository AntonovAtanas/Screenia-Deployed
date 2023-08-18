import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-top-movie',
  templateUrl: './top-movie.component.html',
  styleUrls: ['./top-movie.component.css'],
})
export class TopMovieComponent implements OnInit, OnDestroy {
  topMovieSubscription$!: Subscription;
  topMovie!: Movie;

  isLoading: boolean = false;

  error: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.topMovieSubscription$ = this.movieService.getTopMovie().subscribe({
      next: (response) => {
        this.topMovie = response;
        this.isLoading = false;
      },
      error: (response) => (this.error = response.message),
    });
  }

  ngOnDestroy(): void {
    if (this.topMovieSubscription$ !== undefined) {
      this.topMovieSubscription$.unsubscribe();
    }
  }
}
