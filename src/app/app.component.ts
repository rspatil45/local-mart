import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'local-mart';
  showLogin = false;
  constructor(private loginService: LoginService){}
  ngOnInit(): void {
    this.loginService.loginChanged.subscribe(data=>{
      this.showLogin = data;
    })
  }


}
