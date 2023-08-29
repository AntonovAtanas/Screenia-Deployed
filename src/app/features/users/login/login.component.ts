import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  loginSubscription$!: Subscription;

  error: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }

    const userData = loginForm.value;

    this.loginSubscription$ = this.userService.login(userData).subscribe({
      next: (response) => {
        this.userService.notifyUserAuth(true);
        this.authService.setUserData(response);
        this.error = '';
        this.router.navigate(['/']);
      },
      error: (response) => {
        console.log(response)
        this.error = response.error.message;
        loginForm.reset();
      },
    });
  }

  ngOnDestroy(): void {
    if(this.loginSubscription$ !== undefined){
      this.loginSubscription$.unsubscribe();
    }
  }
}
