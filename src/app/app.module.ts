import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { HeroWrapperComponent } from './features/home/hero-wrapper/hero-wrapper.component';
import { TopMovieComponent } from './features/home/hero-wrapper/top-movie/top-movie.component';
import { LastMoviesComponent } from './features/home/hero-wrapper/last-movies/last-movies.component';
import { MostLikedMoviesComponent } from './features/home/most-liked-movies/most-liked-movies.component';
import { SharedModule } from './shared/shared.module';
import { LastPostsComponent } from './features/home/last-posts/last-posts.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from './shared/custom-pipes/truncate.pipe';
import { ForumModule } from './features/forum/forum.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    TruncatePipe,
    HomeComponent,
    HeroWrapperComponent,
    TopMovieComponent,
    LastMoviesComponent,
    MostLikedMoviesComponent,
    LastPostsComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ForumModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
