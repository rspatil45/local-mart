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
        return;   // extra validation check (by the way button is disable but hacker can..)
      }
      else{
        const email = form.value.email;
        const password = form.value.password;
        const firstname = form.value.firstname;
        const lastname = form.value.lastname;
        this.authService.signUp(email,password,firstname,lastname).subscribe(resData =>{

          this.signupMsg_sucess = "user " + resData.email + " is created "+"successfully !"
          setTimeout(()=>{
            this.userExists = !this.userExists;
          },10);
          form.reset();
        },
        error =>{
          this.signupMsg_error = error.message;
        });

      }
    }
    else
    {
      if(form.invalid)
      {
        return
      }
      const email= form.value.email;
      const password = form.value.password;
      this.authService.logIn(email,password).subscribe(resData=>{
        if(resData){
          this.authService.userLogIn(resData);
         // console.log(this.authService.current_user);
          this.loginService.method();
        }else{
          this.loginMsg="Invalid user credentials"
        }
      },error=>{
        this.loginMsg = error.message;
      })

    }

    // form.reset();
  }
  onSwitch() {
    this.userExists = !this.userExists;
    this.signupMsg_sucess = "";
    this.loginMsg = "";
    //this.signupMsg_sucess= "";
   }
  ngOnInit(): void {
    var myTag = this.e1.nativeElement.querySelector("p");
    if(this.platoform.ANDROID)
    {
      myTag.classList.remove('back-drop');
      myTag.classList.add('small-scr');

    }
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
