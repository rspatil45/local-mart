import { formatCurrency, TitleCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-small',
  templateUrl: './auth-small.component.html',
  styleUrls: ['./auth-small.component.css']
})
export class AuthSmallComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router, private route: ActivatedRoute) { }
  mode = true;
  @ViewChild('f') form;
  loginMsg = "";
  signupMsg_sucess = "";
  signupMsg_error = "";
  ngOnInit(): void {
  }
  onToggleMode() {
    this.mode = !this.mode;
    this.loginMsg = "";
    this.signupMsg_sucess = "";
    this.signupMsg_error = "";
    this.form.reset();
  }
  onSubmit(form: NgForm) {
    if (!this.mode) {
      //if mode doesnot exists then we are in signup Mode
      if (!form.valid) {
        if(form.value.email=="" || form.value.password=="" )
        {
          this.signupMsg_error = "Please fill the all required values"
          return;   // extra validation check
        }

      }
      else {
        if(form.value.terms == false)
        {
          this.signupMsg_error = "You should accept terms and condition";
          return;
        }

        const email = form.value.email;
        const password = form.value.password;
        const firstname = form.value.firstname;
        const lastname = form.value.lastname;
        this.authService.signUp(email, password, firstname, lastname).subscribe(resData => {

          this.signupMsg_sucess = "user " + resData.email + " is created " + "successfully !"
          setTimeout(() => {
            this.mode = !this.mode;
          }, 10);
          form.reset();
        },
          error => {
            this.signupMsg_error = error.message;
            this.signupMsg_error = this.signupMsg_error.slice(0,50);

          });
      }
    }
    else {
      if (form.invalid) {

        return
      }
      const email = form.value.email;
      const password = form.value.password;
      this.authService.logIn(email, password).subscribe(resData => {
        if (resData) {
          this.authService.userLogIn(resData);
          // console.log(this.authService.current_user);
          this.router.navigate(['../']);

        } else {
          this.loginMsg = "Invalid user credentials"
        }
      }, error => {
        this.loginMsg = error.message;

      })
    }

  }

}
