import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/product.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  listChanged = new Subject<Product[]>();
  constructor(private userService: UserService, private proService: ProductService,private router: Router) { }
   products:Product[] = null;
   loading = true;
 // products = null;

  ngOnInit(): void {
    this.setProducts();
    this.listChanged.subscribe(productList=>{
      this.products = productList;
    })
  }
  setProducts(){
    this.userService.getUserProducts().subscribe(productList=>{
      this.listChanged.next(productList);
      this.loading = false;
     });
  }
  onDelete(product:Product){
    this.proService.deleteProduct(product.id).subscribe(value => {
      console.log("product deleted");
    });
    this.setProducts();
  }
  onEdit(product:Product){
    const link = "products/edit/" + product.id;
    this.router.navigate([link]);
    //this.setProducts();
  }
}
