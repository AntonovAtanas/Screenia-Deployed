import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy{
  registerSubscription$!: Subscription;
  error: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const { username, password } = registerForm.value;

    this.userService.register({ username, password }).subscribe({
      next: (response) => {
        this.userService.notifyUserAuth(true);
        this.authService.setUserData(response);
        this.error = '';
        this.router.navigate(['/']);
      },
      error: (response) => {
        this.error = response.error.message;
        registerForm.reset();
      },
    });
  };

  ngOnDestroy(): void {
    if (this.registerSubscription$ !== undefined){
      this.registerSubscription$.unsubscribe();
    }
  }
}
