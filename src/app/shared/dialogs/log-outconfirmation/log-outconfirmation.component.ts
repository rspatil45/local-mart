import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from 'src/app/auth/login.service';
import { NavBarComponent } from 'src/app/nav-bar/nav-bar.component';

@Component({
  selector: 'app-log-outconfirmation',
  templateUrl: './log-outconfirmation.component.html',
  styleUrls: ['./log-outconfirmation.component.css']
})
export class LogOutconfirmationComponent implements OnInit {
   user = this.authService.currentUser;
  constructor(private authService: AuthService,public dialogRef: MatDialogRef<LogOutconfirmationComponent>,
    ) { }

  ngOnInit(): void {

  }
  onCancel(){
    this.dialogRef.close();
  }

}
