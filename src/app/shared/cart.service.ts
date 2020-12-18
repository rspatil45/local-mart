import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from './models/product.model';
import { Cart } from './models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartChanged = new Subject<Cart[]>();
  cart_list: Cart[] = [];

  getCart() {
    return this.cart_list.slice();
  }
  addToCart(cart_item: Cart) {
    let flag = false;
    for (let item of this.cart_list) {
      if (item.item.id == cart_item.item.id) {
        flag = true;
        item.amount = item.amount + 1;
      }
    }
    if (flag == false)
      this.cart_list.push(cart_item);

    this.cartChanged.next(this.cart_list.slice());
  }
  deleteItem(id: number) {
   let index  = 0;
   for(let item of this.cart_list)
   {
     if(item.item.id==id)
     {
       if(item.amount==1)
       {
        this.cart_list.splice(index,1);
        break;
       }
       else
       {
         item.amount = item.amount-1;
         break;
       }
     }
     index=index+1;
   }

    this.cartChanged.next(this.cart_list.slice());
  }
}
