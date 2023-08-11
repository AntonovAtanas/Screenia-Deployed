import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieRoutingModule } from './movies-routing.module';
import { FormsModule } from '@angular/forms';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsMovieComponent } from './page-movie/details-movie/details-movie.component';
import { PageMovieComponent } from './page-movie/page-movie.component';
import { AddReviewMovieComponent } from './page-movie/add-review-movie/add-review-movie.component';
import { AllReviewsMovieComponent } from './page-movie/all-reviews-movie/all-reviews-movie.component';
import { EditComponent } from './edit-movie/edit.component';

@NgModule({
  declarations: [
    AddMovieComponent,
    AllMoviesComponent,
    DetailsMovieComponent,
    PageMovieComponent,
    AddReviewMovieComponent,
    AllReviewsMovieComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MoviesModule { }
