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
  code_to_verify : string;
  loading = false;
  constructor(private cartService: CartService, private router: Router) {
    this.cart_list = this.cartService.getCart();
  }

  ngOnInit(): void {
   // this.cart_list = this.cartService.cart_list;
  }
  onVerification(code_to_verify: string){
    this.loading = true;
    this.cartService.placeOrder(this.cart_list,code_to_verify).subscribe(success=>{
      this.loading = false;
      window.alert("failed to place order, try after sometime.")
    },error=>{
      if(error.error.message === "Invalid authentication code"){
        this.loading = false;
        window.alert(error.error.message);
      }
      else{
        this.loading = false;
        window.alert("Order has been placed");
        this.cartService.cart_list=[];
        this.cartService.cartChanged.next(this.cartService.cart_list);
        this.router.navigate(['/cart']);
      }
    })

  }

}
