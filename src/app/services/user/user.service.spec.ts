import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/app/interfaces/User';
import { ENDPOINT } from 'src/app/environments/endpoints';
import { CONSTS } from 'src/app/environments/constants';

describe('UserServiceService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const userData = {
    username: 'test',
    _id: '123123'
  }

  let mockUserData: User = {
    username: 'testUsername',
    password: '123123'
  };

  const mockUserMovies = [
    {
      title: 'Test Movie 1',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 1',
      ownerId: '1',
    },
    {
      title: 'Test Movie 2',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 2',
      ownerId: '1',
    },
    {
      title: 'Test Movie 3',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      year: 2022,
      description: 'testing the movie details page',
      director: 'Test Director 3',
      ownerId: '1',
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register the user', () => {
    service.register(mockUserData).subscribe(user => {
      expect(user).toBeTruthy();
      expect(user).toEqual(mockUserData);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.users}/register`);

    req.flush(mockUserData);

    expect(req.request.method).toEqual('POST');
  });

  it('should log in the user', () => {
    service.login(mockUserData).subscribe(user => {
      expect(user).toBeTruthy();
      expect(user).toEqual(mockUserData);
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.users}/login`);

    req.flush(mockUserData);

    expect(req.request.method).toEqual('POST');
  });

  it('should get the userId', () => {

    localStorage.setItem(CONSTS.localStorageAuth, JSON.stringify(userData));

    expect(service.getUserId()).toEqual(userData._id)
  });

  it('should return false if there is no logged user', () => {

    localStorage.clear();

    expect(service.getUserId()).toEqual(false)
  });

  it('should get the username', () => {

    localStorage.setItem(CONSTS.localStorageAuth, JSON.stringify(userData));

    expect(service.getUsername()).toEqual(userData.username);
  });

  it('should get the user liked movies', () => {
    service.getUserLikedMovies('123123').subscribe(movies => {
      expect(movies.length).toEqual(mockUserMovies.length);
      expect(movies).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${ENDPOINT.users}/profile/123123`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockUserMovies);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
