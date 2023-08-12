import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { PageMovieComponent } from './page-movie/page-movie.component';
import { EditMovieComponent } from './edit-movie/edit.component';
import { AuthGuardGuestService } from 'src/app/services/auth/auth-guard-guest.service';
import { SearchResultsComponent } from '../search-results/search-results.component';

const routes: Routes = [
    {path: 'add', component: AddMovieComponent},
    {path: 'all', component: AllMoviesComponent},
    {path: 'details/:id', component: PageMovieComponent},
    {path: 'edit/:id', canActivate: [AuthGuardGuestService] , component: EditMovieComponent},
    {path: 'search', component: SearchResultsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
