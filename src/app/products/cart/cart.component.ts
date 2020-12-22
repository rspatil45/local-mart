import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart.model';

import { from, Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  private subscription: Subscription;
  public cart_list: Cart[];
  grand_total=0;
  constructor(private cartService: CartService) {
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
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getGrandTotal(){
      for(let item of this.cart_list)
      {
        this.grand_total = this.grand_total + (item.amount * item.item.price);
      }

  }

}
