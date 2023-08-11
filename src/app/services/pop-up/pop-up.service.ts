import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  onDeletePopUp(message: string): boolean{
    return window.confirm(message);
  }
}
