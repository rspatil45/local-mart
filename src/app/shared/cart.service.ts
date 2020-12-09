import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartChanged = new Subject<Cart[]>();
  cart_list : Cart [] = [];

  getCart(){
    return this.cart_list.slice();
  }
  addToCart(cart_item : Cart){
    this.cart_list.push(cart_item);
    this.cartChanged.next(this.cart_list.slice());
  }
}
