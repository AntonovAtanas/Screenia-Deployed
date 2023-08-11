import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-most-liked-movies',
  templateUrl: './most-liked-movies.component.html',
  styleUrls: ['./most-liked-movies.component.css']
})
export class MostLikedMoviesComponent implements OnInit, OnDestroy {
  moviesArr: Movie[] = [];
  getMoviesSubscription$!: Subscription;

  error: string = '';
  isLoading: boolean = false;

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.getMoviesSubscription$ = this.movieService.getMostLikedMovies(6).subscribe({
      next: (response) => {
        this.moviesArr = response;
        this.isLoading = false;
      },
      error: (response) => this.error = response.message
    })
  };

  ngOnDestroy(): void {
    if (this.getMoviesSubscription$ !== undefined) {
      this.getMoviesSubscription$.unsubscribe();
    }
  }

}

