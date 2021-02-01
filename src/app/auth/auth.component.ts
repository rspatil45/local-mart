import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService} from './auth.service'
import { Router, ActivatedRoute} from '@angular/router';
import { LoginService } from './login.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  userExists = true;

  loginMsg="";
  signupMsg_sucess= "";
  signupMsg_error= "";
  @ViewChild('f') form : NgForm;


  constructor(private router : Router, private route: ActivatedRoute,
    private authService: AuthService ,private loginService: LoginService,
    private platoform: Platform, private e1: ElementRef) { }
  onSubmit(form: NgForm) {
    if(!this.userExists)
    {
      //if user doesnot exists then we are in signup Mode
      if(!form.valid)
      {
        this.signupMsg_error = "Please, fill all required info.";
        return;   // extra validation check (by the way button is disable but hacker can..)
      }
      else{
        const email = form.value.email;
        const password = form.value.password;
        const firstname = form.value.firstname;
        const lastname = form.value.lastname;
        const confirm_password = form.value.confirm_password;
        if(password != confirm_password)
        {
          this.signupMsg_error = "Password does not match!";
          return;
        }
        this.authService.signUp(email,password,firstname,lastname).subscribe(resData =>{

          this.signupMsg_sucess = "user " + resData.email + " is created "+"successfully !"
          setTimeout(()=>{
            this.userExists = !this.userExists;
          },100);
          form.reset();
        },
        error =>{
          this.signupMsg_error = error.error.message;
        });

      }
    }
    else
    {
      if(form.invalid)
      {
        this.loginMsg = "Please properly provide all credentials";
        return;
      }
      const email= form.value.email;
      const password = form.value.password;
      this.authService.logIn(email,password).subscribe(resData=>{
          this.authService.userLoggedIn(resData);
          this.loginService.method();
      },error=>{
        this.loginMsg = error.error.message;
      })

    }

    // form.reset();
  }
  onSwitch() {
    this.userExists = !this.userExists;
    this.signupMsg_sucess = "";
    this.loginMsg = "";
    this.signupMsg_error= "";
   }
  ngOnInit(): void {
    // var myTag = this.e1.nativeElement.querySelector("p");
    // if(this.platoform.ANDROID)
    // {
    //   myTag.classList.remove('back-drop');
    //   myTag.classList.add('small-scr');

    // }
  }

  onClose(){
    this.loginService.method();
  }
  onFormReset(){
    this.loginMsg=null;
    this.signupMsg_sucess=null;
    this.signupMsg_sucess= "";
    this.form.reset();
  }

}
