import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';

import {CONSTS} from '../../environments/constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setUserData(userData: User) {
    localStorage.setItem(CONSTS.localStorageAuth, JSON.stringify(userData));
  };

  isLogged(): boolean{
    if (localStorage.getItem(CONSTS.localStorageAuth)){
      return true;
    }
    return false;
  };

  logout() {
    if (localStorage.getItem(CONSTS.localStorageAuth)){
      localStorage.removeItem(CONSTS.localStorageAuth);
    }
  };
}
