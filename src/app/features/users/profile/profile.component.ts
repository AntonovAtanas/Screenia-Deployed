import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy{
  userLikedMovies$!: Subscription

  moviesArr: Movie[] = [];
  userId: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userLikedMovies$ = this.getUserMovies()
  }

  getUserMovies() {
    return this.userService.getUserLikedMovies(this.userId).subscribe({
      next: (response) => {
        this.moviesArr = response;
        this.isLoading = false;
      } ,
      error: (response) => this.error = response.message
    })
  }

  ngOnDestroy(): void {
    if (this.userLikedMovies$ !== undefined) {
      this.userLikedMovies$.unsubscribe();
    }
  }
}
