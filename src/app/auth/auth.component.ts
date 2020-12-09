import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  userExists = true;
  //@ViewChild('') form : NgForm;
  constructor(private router : Router, private route: ActivatedRoute ) { }
  onSubmit(form: NgForm) {
    this.router.navigate(['../'],{ relativeTo: this.route });
    // form.reset();
  }
  onSwitch() {
    this.userExists = !this.userExists;
   }
  ngOnInit(): void {
  }

}
