import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  error: string = '';
  moviesArr!: Movie[];
  isLoading: boolean = false;

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription$ = this.movieService.getAllMovies().subscribe({
      next: (response) => {
        this.moviesArr = response;
        this.isLoading = false;
      } ,
      error: (response) => this.error = response.error.message
    })
  };

  ngOnDestroy(): void {
    if(this.subscription$ !== undefined){
      this.subscription$.unsubscribe();
    }
  };
}
