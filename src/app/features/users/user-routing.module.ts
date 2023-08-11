import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './profile/profile.component';
import { AuthGuardGuestService } from 'src/app/services/auth/auth-guard-guest.service';
import { AuthGuardUserService } from 'src/app/services/auth/auth-guard-user.service';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuardUserService],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [AuthGuardUserService],
    component: RegisterComponent,
  },
  {
    path: 'profile/:id',
    canActivate: [AuthGuardGuestService],
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
