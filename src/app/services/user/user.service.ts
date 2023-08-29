import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/User';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { CONSTS } from 'src/app/environments/constants';
import { Movie } from 'src/app/interfaces/Movie';
import { ENDPOINT } from 'src/app/environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserLogged$$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${ENDPOINT.users}/register`, userData);
  };

  login(userData: User): Observable<User> {
    return this.http.post<User>(`${ENDPOINT.users}/login`, userData);
  };

  getUserId(){
    const userData = localStorage.getItem(CONSTS.localStorageAuth)
    
    if (userData) {
      return JSON.parse(userData)._id
    }

    return false
  };

  getUserLikedMovies(userId: string){
    return this.http.get<Movie[]>(`${ENDPOINT.users}/profile/${userId}`);
  };

  getUsername(){
    const storedUser = localStorage.getItem(CONSTS.localStorageAuth);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const username = parsedUser.username;
        return username
      }
  };

  notifyUserAuth(loginStatus: boolean){
    this.isUserLogged$$.next(loginStatus);
  };

}
