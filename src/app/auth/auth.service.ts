import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from '../shared/models/user.model';
import { Subject } from 'rxjs';

interface response_format{
  userId : number,
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser:User = null;
  userChanged = new Subject<{email:String,firstname:String, lastname:String,role:String,userId:String}>();
  constructor(private http: HttpClient) { }


   signUp(email: string, password: string, firstname: string, lastname: string){
    return this.http.post<response_format>("http://localhost:8080/users/signup",{
      firstname : firstname,
      lastname : lastname,
      email: email,
      password: password

    });
  }

  logIn(email: string, password: string){
      return this.http.post("http://localhost:8080/users/login",{
        email: email,
        password: password
      })
  }
  userLogIn(user){
    this.currentUser = user;
    this.userChanged.next(this.currentUser);

  }


}


//localhost:8080/users
// {
//   "firstname":"rahul",
//   "lastname":"patil",
//   "email":"rspatil45@gmail.com",
//   "password":"9665613416"
// }
