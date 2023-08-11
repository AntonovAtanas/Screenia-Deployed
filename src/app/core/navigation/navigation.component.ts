import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent   {
  userId: string = '';

  searchValue: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private movieService: MovieService,
    private userService: UserService
  ) {}


  get isLogged(): boolean {
    let isLogged = this.authService.isLogged()
    if (isLogged){
      this.userId = this.userService.getUserId();
    }
    return isLogged;
  }

  onInputSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value
    this.movieService.notifyNewSearch(this.searchValue);
  }

  onSearch() {
    if (this.searchValue == '') {
      return;
    }
    this.router.navigate([`movies/search`]);
    this.movieService.notifyNewSearch(this.searchValue);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
