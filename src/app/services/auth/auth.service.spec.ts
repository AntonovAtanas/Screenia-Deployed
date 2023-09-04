import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user data in the local storage', () => {
    const userData = {
      username: 'test',
      password: '123123'
    }

    service.setUserData(userData);
    expect(localStorage.getItem('user')).toBeTruthy();
  });

  it('returns true of the user is logged', () => {
    // Arrange
    const userData = {
      username: 'test',
      password: '123123'
    }

    // Act
    service.setUserData(userData);

    // Assert
    expect(service.isLogged()).toEqual(true);
  });

  it('returns false of the user is not logged', () => {
    // Arrange

    // Act
    localStorage.clear();
    // Assert
    expect(service.isLogged()).toEqual(false);
  });

  it('logs out the user if he is logged', () => {
    // Arrange
    const userData = {
      username: 'test',
      password: '123123'
    }

    // Act
    service.setUserData(userData);
    service.logout()
    // Assert
    expect(localStorage.getItem('user')).toBeFalsy()
  });
});
