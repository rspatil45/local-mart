import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../../shared/product.model';
import { CartService } from 'src/app/shared/cart.service';
import { Cart } from 'src/app/shared/cart.model';

@Component({
  selector: 'app-product-element',
  templateUrl: './product-element.component.html',
  styleUrls: ['./product-element.component.css']
})
export class ProductElementComponent implements OnInit {
  btn_not_clicked = true;
  constructor(private cartService : CartService) { }
  @Input() product : Product;
  @Input() index : number;
  ngOnInit(): void {
  }
  onAddCart(){
    this.btn_not_clicked = false;
    const cart_item = new Cart(this.product,1);
    this.cartService.addToCart(cart_item)
  }

}
