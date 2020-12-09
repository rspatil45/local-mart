import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../shared/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private proService: ProductService) {
    this.products = this.proService.getProducts();
   }

  ngOnInit(): void {
    this.proService.productChanged.subscribe((products : Product[])=>{
      this.products = products;
    });
  }
  ngOnDestroy(){
    this.proService.productChanged.unsubscribe();
  }

}
