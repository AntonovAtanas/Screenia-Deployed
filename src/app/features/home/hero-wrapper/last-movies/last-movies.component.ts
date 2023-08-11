import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-last-movies',
  templateUrl: './last-movies.component.html',
  styleUrls: ['./last-movies.component.css']
})
export class LastMoviesComponent implements OnInit, OnDestroy {
  movieSubscription$!: Subscription;

  lastThreeMovies: Movie[] = [];
  error: string = '';

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.movieSubscription$ = this.movieService.getLastMovies(3).subscribe({
      next: (response) => this.lastThreeMovies = response,
      error: (response) => this.error = response.message
    })
  };

  ngOnDestroy(): void {
    if (this.movieSubscription$ !== undefined){
      this.movieSubscription$.unsubscribe();
    }
  }
}
