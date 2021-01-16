import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from '../shared/models/user.model';
import { Subject } from 'rxjs';

interface response_format{
  userId : number,
  firstname: string,
  lastname: string,
  email: string,

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser:User = null;
  userChanged = new Subject<User>();
  constructor(private http: HttpClient) { }


   signUp(email: string, password: string, firstname: string, lastname: string){
    return this.http.post<response_format>("http://localhost:8080/users/signup",{
      firstname : firstname,
      lastname : lastname,
      email: email,
      password: password
    });
  }
  autoLogIn(){
    const userData:User = JSON.parse(localStorage.getItem('userData'));

     if(!userData)
       return false;

    this.currentUser = userData;
    this.userChanged.next(this.currentUser);
    return true;
  }
  logIn(email: string, password: string){
      return this.http.post("http://localhost:8080/users/login",{
        email: email,
        password: password
      })
  }
  userLoggedIn(user){
    this.currentUser = user;
    console.log(user);
    localStorage.setItem('userData',JSON.stringify(user));
    this.userChanged.next(this.currentUser);

  }


}
