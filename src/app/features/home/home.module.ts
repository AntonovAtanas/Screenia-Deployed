import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroWrapperComponent } from './hero-wrapper/hero-wrapper.component';
import { TopMovieComponent } from './hero-wrapper/top-movie/top-movie.component';
import { LastMoviesComponent } from './hero-wrapper/last-movies/last-movies.component';
import { MostLikedMoviesComponent } from './most-liked-movies/most-liked-movies.component';
import { LastPostsComponent } from './last-posts/last-posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeroWrapperComponent,
    TopMovieComponent,
    LastMoviesComponent,
    MostLikedMoviesComponent,
    LastPostsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class HomeModule { }
