import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieRoutingModule } from '../features/movies/movies-routing.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SlicerPipe } from './custom-pipes/slice.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DateAgoPipe } from './custom-pipes/date-ago.pipe';

@NgModule({
  declarations: [MovieCardComponent, LoadingSpinnerComponent, SlicerPipe, PageNotFoundComponent, DateAgoPipe],
  imports: [
    CommonModule,
    MovieRoutingModule,
  ],
  exports: [MovieCardComponent, LoadingSpinnerComponent, DateAgoPipe]
})

export class SharedModule { }
