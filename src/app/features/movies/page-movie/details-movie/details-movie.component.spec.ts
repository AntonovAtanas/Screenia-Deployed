import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { DetailsMovieComponent } from './details-movie.component';
import { MoviesModule } from '../../movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { BehaviorSubject, of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { PopUpService } from 'src/app/services/pop-up/pop-up.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Movie } from 'src/app/interfaces/Movie';
import { DebugElement } from '@angular/core';

describe('DetailsMovieComponent', () => {
  let component: DetailsMovieComponent;
  let fixture: ComponentFixture<DetailsMovieComponent>;
  let el: DebugElement;

  let mockMovieService: any;
  let mockUserService: any;
  let mockReviewService: any;
  let mockPopUpService: any;
  let mockAuthService: any;
  let router: Router;

  const currentMovie: Movie = {
    title: 'Test Movie',
    imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    year: 2022,
    description: 'testing the movie details page',
    director: 'Test Director',
    ownerId: '83827277',
  }

  beforeEach(waitForAsync(() => {

    let movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovie', 'getMovieStats', 'likeMovie', 'hasUserLiked', 'unlikeMovie', 'deleteMovie'])
    let reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['reviewAdded$']);
    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserId']);
    let popUpServiceSpy = jasmine.createSpyObj('PopUpService', ['onDeletePopUp']);
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['isLogged']);

    TestBed.configureTestingModule({
      declarations: [DetailsMovieComponent],
      imports: [MoviesModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: MovieService, useValue: movieServiceSpy},
        {provide: ReviewService, useValue: reviewServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
        {provide: PopUpService, useValue: popUpServiceSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(DetailsMovieComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;

      mockMovieService = TestBed.inject(MovieService);
      mockUserService = TestBed.inject(UserService);
      mockReviewService = TestBed.inject(ReviewService);
      mockPopUpService = TestBed.inject(PopUpService);
      mockAuthService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);

      mockReviewService.reviewAdded$ = new BehaviorSubject<any>(null).asObservable();
      mockMovieService.getMovie.and.returnValue(of(currentMovie));
      mockMovieService.getMovieStats.and.returnValue(of({likes: 0, rating: 5}));
      mockMovieService.hasUserLiked.and.returnValue(of({ hasLiked: false }));

      mockUserService.getUserId.and.returnValue('123123123');

      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the movie correctly', fakeAsync(() => {
    // Arrange
    component.movieId = '7273772';
    const movieTitle = el.nativeElement.querySelector('.card-title');
    const movieDirector = el.nativeElement.querySelector('.card-director');
    const movieDescription = el.nativeElement.querySelector('.card-description');
    const movieImage = el.nativeElement.querySelector('.card-media');
    const movieYear = el.nativeElement.querySelector('.movie-year');
    const movieLikes = el.nativeElement.querySelector('.movie-likes');
    const movieRating = el.nativeElement.querySelector('.movie-rating');

    // Act

    // Assert
    expect(movieTitle.textContent).toEqual(currentMovie.title);
    expect(movieDirector.textContent).toEqual(currentMovie.director);
    expect(movieDescription.textContent).toEqual(currentMovie.description);
    expect(movieImage.src).toEqual(currentMovie.imageUrl);
    expect(Number(movieYear.textContent)).toEqual(currentMovie.year);
    expect(Number(movieLikes.textContent)).toEqual(component.likes);
    expect(Number(movieRating.textContent.split(' / ')[0])).toEqual(component.rating);
  }));

  it('should not show any button if the user is not logged', fakeAsync(() => {
    // Arrange
    
    // Act
    component.isLogged = false;
    fixture.detectChanges();

    const movieActionButtons = el.nativeElement.querySelector('.card-buttons');
    // Assert

    expect(movieActionButtons).toBeFalsy();
  }));

  it('should show like button if user is logged', fakeAsync(() => {
    // Arrange
    
    // Act
    component.isLogged = true;
    fixture.detectChanges();

    const movieActionButtons = el.nativeElement.querySelector('.card-buttons');
    // Assert
    expect(movieActionButtons.children[0].textContent).toBe('Like')
    expect(movieActionButtons).toBeTruthy();
  }));

  it('should show delete and edit buttons if user is the owner', fakeAsync(() => {
    // Arrange
    
    // Act
    component.isLogged = true;
    component.isOwner = true;
    fixture.detectChanges();

    const movieActionButtons = el.nativeElement.querySelector('.card-buttons');
    // Assert
    expect(movieActionButtons.children[0].textContent).toBe('Edit')
    expect(movieActionButtons.children[1].textContent).toBe('Delete')
    expect(movieActionButtons).toBeTruthy();
  }));

  it('should add a like to the movie', fakeAsync(() => {
    // Arrange
    // Act
    component.isLogged = true;
    fixture.detectChanges();

    const movieLikes = el.nativeElement.querySelector('.movie-likes');
    
    mockMovieService.likeMovie.and.returnValue(of('test'));
    component.likeMovie()

    tick();
    fixture.detectChanges();
    // Assert
    expect(movieLikes.textContent).toEqual('1')
  }));

  it('should call the like movie function', fakeAsync(() => {
    // Arrange
    const navigateSpy = spyOn(component, 'likeMovie');
    // Act
    component.isLogged = true;
    fixture.detectChanges();

    const likeButton = el.nativeElement.querySelector('.card-buttons').children[0];
    
    likeButton.click();

    // Assert
    expect(navigateSpy).toHaveBeenCalled();
  }));

  it('should unlike unlike the movie correctly', fakeAsync(() => {
    // Arrange
    // Act
    component.isLogged = true;
    component.hasLiked = {hasLiked: true};
    component.likes = 2;
    fixture.detectChanges();

    const unlikeButton = el.nativeElement.querySelector('.card-buttons').children[0];
    const movieLikes = el.nativeElement.querySelector('.movie-likes');

    mockMovieService.getMovieStats.and.returnValue(of({likes: 2, rating: 5}));
    mockMovieService.unlikeMovie.and.returnValue(of('test'));
    component.unlike();

    tick();
    fixture.detectChanges();

    // Assert
    expect(unlikeButton.textContent).toEqual('Unlike');
    expect(component.hasLiked.hasLiked).toEqual(false);
  }));

  it('should call the delete function on click', fakeAsync(() => {
    // Arrange
    component.isOwner = true;
    component.isLogged = true;
    fixture.detectChanges();

    const deleteButton = el.nativeElement.querySelectorAll('.btn-main')[1];
    const deleteSpy = spyOn(component, 'onDelete');
    
    // Act
    deleteButton.click();
    fixture.detectChanges()
    // Assert
    expect(deleteButton.textContent).toEqual('Delete');
    expect(deleteSpy).toHaveBeenCalled();
  }));

  it('should redirect to all movies after the owner deletes it', fakeAsync(() => {
    // Arrange
    component.isOwner = true;
    component.isLogged = true;
    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigate');
    
    // Act
    mockPopUpService.onDeletePopUp.and.returnValue(true);
    mockMovieService.deleteMovie.and.returnValue(of('test'))
    component.onDelete();
    tick();
    fixture.detectChanges()
    // Assert
    expect(navigateSpy).toHaveBeenCalledWith(['/movies/all']);
  }))
});
