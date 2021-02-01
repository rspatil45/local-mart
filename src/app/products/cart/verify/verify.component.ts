import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';
import { Cart } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  cart_list: Cart[];
  loading = false;
  constructor(private cartService: CartService, private router: Router) {
    this.cart_list = this.cartService.getCart();
  }

  ngOnInit(): void {
   // this.cart_list = this.cartService.cart_list;
  }
  onVerification(){
    this.loading = true;
    this.cartService.placeOrder(this.cart_list).subscribe(error=>{
      this.loading = false;
      window.alert("failed to place order, try after sometime.")
    },success=>{
      this.loading = false;
      window.alert("Order has been placed");
      this.cartService.cart_list=[];
      this.cartService.cartChanged.next(this.cartService.cart_list);
      this.router.navigate(['/products']);
    })

  }

}
