import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { CartService} from '../../shared/cart.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { Subscription, Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar'
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product:Product=null;
  productChanged = new Subject<Product>();
  id: number;
  haveAccess = false;
  user = this.authService.currentUser;
  quantity: number = 0;
  subscription: Subscription;

  constructor(private proService: ProductService, private route: ActivatedRoute,
    private router: Router, private cartService: CartService,private _snackBar: MatSnackBar,
    private authService: AuthService) { }

    ngOnInit(): void {
      this.subscription=this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];

      this.proService.getProduct(this.id).subscribe(item=>{
      this.productChanged.next(item);
   })  });

   this.productChanged.subscribe(item=>{
     this.product = item;
     this.getAccess();
   })
  }
  // onSetProduct(product:Product){
  //   this.product = product;
  //   this.getAccess();
  // }
  onAddtoCart(){

    this.quantity = this.quantity+1;
    const  cart_item = new Cart(this.product, this.quantity);
    this.cartService.addToCart(cart_item);

    this._snackBar.open("Product Added","successfylly!",{ duration:1000});

  }
  onUpdate(){

    const link = "products/edit/" + this.product.id;

    this.router.navigate([link]);
  }

  onDelete(){
    this.proService.deleteProduct(this.id).subscribe(value=>{
      if(value)
      {
        this.router.navigate(['/products']);
      }
    })


  }

  getAccess(){

    if(this.user)
    {
      if(this.user.userId == this.product.userId)
      {
        this.haveAccess = true;
        // console.log(this.user.userId, this.product.userId);
      }
      if(this.user.role == "admin")
      {
        this.haveAccess = true;
      }
    }

  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }


}
