import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from 'src/app/shared/cart.model';

import { from, Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private cartService: CartService) { }
  cart_list: Cart[] = this.cartService.getCart();
  ngOnInit(): void {
    this.subscription = this.cartService.cartChanged.subscribe((carts) => {
      this.cart_list = carts;
      console.log('cart changed');
      console.log(carts);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
