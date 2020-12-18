import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/models/product.model';
import {ProductService} from '../../shared/product.service'
import { PageEvent } from '@angular/material/paginator';
import { timer } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  totalPosts: number;
  pageOptions=[2,4,8,12,16];
  postPerPage:number = 4;
  currentPage:number = 1;
  products: Product[] = [];
  category = "all";

  constructor(private proService: ProductService) {

   }

  ngOnInit(): void {

    this.proService.fetchProducts(this.postPerPage,this.currentPage);
    this.products= this.proService.getProducts();
    this.proService.productChanged.subscribe((products_t : Product[])=>{
      this.products = products_t;
    });

    this.proService.fetchCount().subscribe(count=>{
      this.totalPosts = +count;
    })

    this.proService.categoryChanged.subscribe(
      (category)=>{
        this.category = category;
        console.log(this.category);
        if(this.category == "all")
        this.proService.fetchProducts(this.postPerPage,1);
        else
        this.proService.fetchProductByCategory(this.category,this.postPerPage,1);
      })

  }
  onPageChange(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    if(this.category=="all")
      this.proService.fetchProducts(this.postPerPage,this.currentPage);
    else
    {
      this.proService.fetchProductByCategory(this.category,this.postPerPage,this.currentPage);
    }
  }

  // ngOnDestroy(){
  //   this.proService.productChanged.unsubscribe();
  // }

}
