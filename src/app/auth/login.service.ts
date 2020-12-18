import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  showLogin:boolean=false;

  loginChanged = new Subject<boolean>();
  constructor() { }
  method(){
    this.showLogin = ! this.showLogin;
    this.loginChanged.next(this.showLogin);
  }

}
