import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../../shared/models/product.model';
import { CartService } from 'src/app/shared/cart.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent} from '../../../shared/loading/loading.component';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-product-element',
  templateUrl: './product-element.component.html',
  styleUrls: ['./product-element.component.css']
})
export class ProductElementComponent implements OnInit {
  @Input() product: Product;
  index : number;
  btn_not_clicked = true;
  show = true;
  count = 0;
  modDescription="";
  modified_date=null;
  constructor(private cartService : CartService, private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.show = false;
    },1000);
    this.index = this.product.id;
   // console.log(this.product);
   this.modified_date = formatDate(this.product.date,"yyyy-MM-dd","en-US");
   this.modDescription = this.product.description.slice(0,25)+" ...";
  }
  onAddCart(){
    //this.btn_not_clicked = false;
    this.count = this.count + 1;
    const cart_item = new Cart(this.product,1);
    this.cartService.addToCart(cart_item);
    this._snackBar.open("Product Added","successfully!",{ duration:1000});
  }
  onRemoveCart(){
    this.count = this.count-1;
    this.cartService.deleteItem(this.product.id);
    this._snackBar.open("Removed one item!","successfully",{duration:1000});
  }
  onDetail(){
    this.router.navigate([this.product.id],{relativeTo:this.route});
  }

}
