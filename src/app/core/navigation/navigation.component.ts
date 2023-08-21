import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit{
  userId: string = '';
  searchValue: string = '';

  isHamburgerMenuShown = false;

  isLogged = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private movieService: MovieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    this.userService.notifyUserAuth(this.isLogged);

    this.userService.isUserLogged$$.subscribe({
      next: response => this.isLogged = response
    })

  }

  onInputSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value
    this.movieService.notifyNewSearch(this.searchValue);
  };

  onSearch() {
    if (this.searchValue == '') {
      return;
    }
    this.router.navigate([`movies/search`]);
    this.movieService.notifyNewSearch(this.searchValue);
  };

  onLogout(): void {
    this.authService.logout();
    this.userService.notifyUserAuth(false);
    this.router.navigate(['/']);
  };

  hamburgerMenuToggle(){
     this.isHamburgerMenuShown == true ? this.isHamburgerMenuShown = false : this.isHamburgerMenuShown = true
  };

  // hide hamburger menu when clicked on link
  toggleHamburgerMenu() {
    if (this.isHamburgerMenuShown == true) {
      this.isHamburgerMenuShown = false
    }
  }
}
