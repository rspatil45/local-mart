import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogOutconfirmationComponent } from '../shared/dialogs/log-outconfirmation/log-outconfirmation.component';
import { User } from '../shared/models/user.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLogged:User;
  constructor(private loginService: LoginService, public authService:AuthService,
    private route : ActivatedRoute, private dialog: MatDialog,
    private router : Router) { }

  LoginButtonClicked  = new EventEmitter<boolean>()
  ngOnInit(): void {
    this.userLogged = this.authService.getUser();
    this.authService.userChanged.subscribe((user)=>{
      this.userLogged = user;
    })
  }

  demoClicked(){
    this.loginService.method();
  }
  onCartClick(){
    // console.log(this.userLogged);
    // if(this.userLogged == null)
    // {
    //   this.demoClicked();
    // }
    // else
    {
      this.router.navigate(['/cart'],{relativeTo: this.route});
    }
  }
  onLogOut(){
    var diaglogOutput:any;
    const dialogRef = this.dialog.open(LogOutconfirmationComponent, {
      width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      diaglogOutput = result;
      if(diaglogOutput)
      {
        this.authService.userLoggedIn(null);
        window.location.reload();
        // this.router.navigate(["products"],{relativeTo: this.route});
      }
    });
  }
}
