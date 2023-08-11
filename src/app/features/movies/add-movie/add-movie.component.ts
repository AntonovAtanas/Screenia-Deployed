import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie/movie.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnDestroy {

  subscribe$!: Subscription;
  error: string = '';

  constructor(private movieService: MovieService, private userService: UserService, private router: Router){}

  onCreate(addMovieForm: NgForm){
    if (addMovieForm.invalid){
      return
    }

    const {title, description, year, imageUrl, director} = addMovieForm.value;
    const userId = this.userService.getUserId();
    
    this.subscribe$ = this.movieService.addMovie({title, description, director, year: Number(year), imageUrl, ownerId: userId}).subscribe({
      next: () => this.router.navigate(['/']),
      error: (response) => {
        this.error = response.error.message;
        addMovieForm.reset();
      },
    });
  }

  ngOnDestroy(): void {
    if(this.subscribe$ !== undefined){
      this.subscribe$.unsubscribe()
    }
  }
}
