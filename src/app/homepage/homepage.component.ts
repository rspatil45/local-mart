import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  latest_products:Product[] = null;
  constructor(private proService: ProductService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogIn();
    this.proService.fetchLatestProduct().subscribe((item)=>{
      this.latest_products = item;
    })
  }
}
