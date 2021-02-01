import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 changeInList = new Subject<Product[]>();

  constructor(private http: HttpClient, private router:Router, private authService: AuthService,private proService:ProductService) { }
  back_url = "http://localhost:8080";

  getUserProducts(){
    const uid = this.authService.currentUser.publicUid;
    console.log(uid);
    return this.http.get<Product[]>(this.back_url+"/users/products/"+uid);
  }
}
