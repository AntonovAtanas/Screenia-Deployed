import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINT } from 'src/app/environments/endpoints';
import { Movie } from 'src/app/interfaces/Movie';
import { Stats } from 'src/app/interfaces/Stats';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private newSearchSource$$ = new BehaviorSubject<any>(null);
  newSearch$ = this.newSearchSource$$.asObservable();

  constructor(private http: HttpClient) { }

  addMovie(movieData: Movie){
    return this.http.post(`${ENDPOINT.movies}/add`, movieData);
  };

  getAllMovies(){
    return this.http.get<Movie[]>(`${ENDPOINT.movies}/all`)
  };

  getLastMovies(number?: Number){
    return this.http.get<Movie[]>(`${ENDPOINT.movies}/latest=${number}`)
  };

  getMostLikedMovies(number?: Number){
    return this.http.get<Movie[]>(`${ENDPOINT.movies}/most-liked=${number}`)
  };

  getTopMovie(){
    return this.http.get<Movie>(`${ENDPOINT.movies}/top-movie`)
  };

  getMovie(movieId: string){
    return this.http.get<Movie>(`${ENDPOINT.movies}/details/${movieId}`)
  };

  getMovieStats(movieId: string): Observable<Stats>{
    return this.http.get<Stats>(`${ENDPOINT.movies}/details/${movieId}/stats`);
  };

  likeMovie(movieId: string, userId: string) {
    return this.http.post(`${ENDPOINT.movies}/details/${movieId}/like`, {userId})
  };

  unlikeMovie(movieId: string, userId: string) {
    return this.http.post(`${ENDPOINT.movies}/details/${movieId}/unlike`, {userId})
  };

  hasUserLiked(movieId: string, userId: string) {
    return this.http.get(`${ENDPOINT.movies}/details/${movieId}/like/${userId}`);
  };

  editMovie(movieId: string, movieData: Movie){
    return this.http.put(`${ENDPOINT.movies}/edit/${movieId}`, movieData);
  };

  searchMovie(searchTerm: string){
    return this.http.get<Movie[]>(`${ENDPOINT.movies}/search/${searchTerm}`);
  };

  deleteMovie(movieId: string){
    return this.http.delete(`${ENDPOINT.movies}/delete/${movieId}`);
  }

  notifyNewSearch(searchTerm: string){
    this.newSearchSource$$.next(searchTerm);
  };
}
