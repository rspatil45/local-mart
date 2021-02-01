import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart.model';

import { from, Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  private subscription: Subscription;
  loading = false;
  public cart_list: Cart[];
  grand_total=0;
  constructor(private cartService: CartService, private _snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute, ) {
    this.cart_list = this.cartService.getCart();
    this.getGrandTotal();
   }

  ngOnInit(): void {
    this.subscription = this.cartService.cartChanged.subscribe((carts) => {
      this.cart_list = carts;
      this.grand_total=0;
      this.getGrandTotal();
    });
  }
  onDeleteItem(index: number){
    this.cartService.deleteItem(index);
    this._snackBar.open("Product removed","successfully!",{ duration:1000});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onAddToCart(product){
    const cart_item = new Cart(product,1);
    this.cartService.addToCart(cart_item);
    this._snackBar.open("Product Added","successfully!",{ duration:1000});
  }
  getGrandTotal(){
      for(let item of this.cart_list)
      {
        this.grand_total = this.grand_total + (item.amount * item.item.price);
      }

  }
  goToDetails(index: number)
  {
    const url = "/products/"+index.toString();
    this.router.navigate([url]);
  }
  onCheckOut(){
    if(this.cart_list.length <= 0)
    {
      window.alert("Please shop something before checkout.");
    }
    else{
      this.loading = true;
      this.cartService.verifyOrder().subscribe(success=>{
        console.log(success);
        this.router.navigate(["/verify"]);
        this.loading = false;
      },error=>{
        console.log(error);
        this.loading = false;
      })
    }

  }

}
