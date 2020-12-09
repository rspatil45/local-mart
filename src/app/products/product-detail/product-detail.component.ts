import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { CartService} from '../../shared/cart.service';
import { Cart } from 'src/app/shared/cart.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  id: number;
  quantity: number = 0;
  constructor(private proService: ProductService, private route: ActivatedRoute,
    private router: Router, private cartService: CartService) { }
    private subscription: Subscription;
  ngOnInit(): void {
    this.subscription=this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.product = this.proService.getProduct(this.id);
    })
  }
  onAddtoCart(){
    this.quantity = this.quantity+1;
    const  cart_item = new Cart(this.product, this.quantity);
    this.cartService.addToCart(cart_item);
    console.log(cart_item);
  }
  onUpdate(){

  }
  onDelete(){

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
