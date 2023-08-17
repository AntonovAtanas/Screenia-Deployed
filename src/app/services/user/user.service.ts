import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/User';
import { Observable } from 'rxjs';
import { CONSTS } from 'src/app/environments/constants';
import { Movie } from 'src/app/interfaces/Movie';
import { ENDPOINT } from 'src/app/environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${ENDPOINT.users}/register`, userData);
  };

  login(userData: User): Observable<User> {
    return this.http.post<User>(`${ENDPOINT.users}/login`, userData);
  };

  getUserId(){
    // error when user not logged in?
    // const userData = JSON.parse(localStorage.getItem(CONSTS.localStorageAuth)!)._id;
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
  }
}
