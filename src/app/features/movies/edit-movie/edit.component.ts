import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditMovieComponent implements OnInit, OnDestroy {
  currentMovieSubscription$!: Subscription;
  editMovieSubscription$!: Subscription;

  currentMovie: Movie = {
    title: '',
    imageUrl: '',
    year: 0,
    description: '',
    director: '',
    ownerId: '',
  };

  movieId: string = '';
  error: string = '';

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params['id'];
    this.currentMovieSubscription$ = this.movieService
      .getMovie(this.movieId)
      .subscribe({
        next: (response) =>{
          this.currentMovie = response;
          // redirect user if he is not the owner
          if (response.ownerId !== this.userService.getUserId()){
            this.router.navigate(['/movies/all']);
          }
        },
        error: (response) => this.error = response.message,
      });
  }

  onEdit(editMovieForm: NgForm) {
    if (editMovieForm.invalid){
      return
    }

    this.editMovieSubscription$ = this.movieService.editMovie(this.movieId, editMovieForm.value).subscribe({
      next: () => this.router.navigate([`/movies/details/${this.movieId}`]),
      error: (response) => this.error = response.message
    })
  };

  ngOnDestroy(): void {
    if (this.editMovieSubscription$ !== undefined){
      this.editMovieSubscription$.unsubscribe();
    }

    if(this.currentMovieSubscription$ !== undefined){
      this.currentMovieSubscription$.unsubscribe();
    }
  }
}
