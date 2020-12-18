import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(private http: HttpClient,private authService : AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.http.post("http://localhost:8080/products/new",{
    name : form.value.item_name,
    image : form.value.image,
    description: form.value.description,
    price: form.value.price,
    quantity : form.value.quantity,
    userId : this.authService.currentUser.userId,
    category: "other"
    }).subscribe(item=>{
      form.reset();
    },error=>{
      console.log(error.message);
    }
    )
  }

}
