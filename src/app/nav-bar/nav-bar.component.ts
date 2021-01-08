import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogOutconfirmationComponent } from '../shared/dialogs/log-outconfirmation/log-outconfirmation.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLogged = null;

  constructor(private loginService: LoginService, public authService:AuthService,
    private route : ActivatedRoute, private dialog: MatDialog,
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
    var diaglogOutput:any;
    const dialogRef = this.dialog.open(LogOutconfirmationComponent, {
      width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      diaglogOutput = result;
      if(diaglogOutput)
      {
        this.authService.userLogIn(null);
        this.router.navigate(["products"],{relativeTo: this.route});
      }



    });



  }
 // current_user = this.authService.current_user;

}
