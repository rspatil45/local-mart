import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLogged = null;

  constructor(private loginService: LoginService, public authService:AuthService,
    private route : ActivatedRoute,
    private router : Router) { }

  LoginButtonClicked  = new EventEmitter<boolean>()
  ngOnInit(): void {
    this.authService.userChanged.subscribe((user)=>{
      this.userLogged = user;
    })
  }

  demoClicked(){
    this.loginService.method();
  }
  onLogOut(){
    this.authService.userLogIn(null);
    this.router.navigate(["products"],{relativeTo: this.route});
  }
 // current_user = this.authService.current_user;

}
