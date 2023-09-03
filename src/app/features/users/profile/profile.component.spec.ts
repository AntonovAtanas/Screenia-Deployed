import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserProfileComponent } from './profile.component';
import { UserModule } from '../user.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user/user.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let el: DebugElement;
  let mockUserService: any;
  
  const mockMoviesArr = [
    { 
      title: 'Hobbit',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
      description: 'test description',
      director: 'peter jackson',
      year: 2013
    },
    { 
      title: 'Matrix',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWM5MTQ3NDMtNGFiMS00Y2E5LWE2ZTUtNzM5MTcyZjM3ODRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
      description: 'test description',
      director: 'peter',
      year: 2003,
    }
  ]

  beforeEach(waitForAsync(() => {
    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserLikedMovies']);

    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [UserModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockUserService = TestBed.inject(UserService);
        mockUserService.getUserLikedMovies.and.returnValue(of(mockMoviesArr));

        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all movies from the array', () => {
    // Arrange
    const userMovies = el.nativeElement.querySelector('.grid-top-rated-movies');
    // Act
    
    // Assert
    expect(userMovies.children.length).toEqual(mockMoviesArr.length);
  });

  it('should show that there are no liked movies if user has not liked any', () => {
    // Arrange
    const userMovies = el.nativeElement.querySelector('.grid-top-rated-movies');
    // Act
    component.moviesArr = [];
    fixture.detectChanges();
    const message = el.nativeElement.querySelector('.text-center');
    // Assert
    expect(userMovies.children.length).toEqual(component.moviesArr.length);
    expect(message.textContent.trim()).toEqual('No liked movies!');
  });
});
