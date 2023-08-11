import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy{
  searchTermSubscription$!: Subscription;
  newSearchSubscription$!: Subscription;

  searchTerm: string = '';
  
  searchResults: Movie[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.newSearchListener();
    this.getSearchResults();
  };

  newSearchListener(){
    this.newSearchSubscription$ = this.movieService.newSearch$.subscribe({
      next: (response) =>{
        this.searchTerm = response;
        if (response == '') {
          return
        }
        this.getSearchResults();
      } 
    });
  };

  getSearchResults(){
    this.searchTermSubscription$ = this.movieService.searchMovie(this.searchTerm).subscribe({
      next: (response) => {
        this.searchResults = response;
        this.isLoading = false;
      },
      error: (response) => this.error = response.message
    })
  }

  ngOnDestroy(): void {
    if (this.searchTermSubscription$ !== undefined) {
      this.searchTermSubscription$.unsubscribe();
    }

    if (this.newSearchSubscription$ !== undefined){
      this.newSearchSubscription$.unsubscribe();
    }
  }
}
