import { Injectable } from '@angular/core';
import {Product} from './product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  imgAuthor = "https://avatars1.githubusercontent.com/u/50131992?s=460&u=0b23be4aeef4a73d37f7657a00def910cdf1c4ae&v=4";
  img2 ="https://img.jakpost.net/c/2019/11/12/2019_11_12_82229_1573532922._large.jpg";
  img = "https://image.shutterstock.com/image-photo/pav-bhaji-fast-food-dish-260nw-1133164979.jpg";
  img3 = "https://image.shutterstock.com/image-photo/clay-pot-plate-isolated-on-260nw-556962304.jpg";

  productChanged = new Subject<Product[]>();

  private products : Product[] = [
    new Product(1,"pavbhaji","nice product",this.img,50,12),
    new Product(2,"Burger King","nice product",this.img2,50,12),
    new Product(3,"matka","nice matka made in india",this.img3,100,12),
    new Product(4,"Rahul Patil","Mean Stack developer",this.imgAuthor,0,1)
  ];

  getProducts(){
    return this.products.slice();
  }
  getProduct(index: number){
    return this.products.slice()[index];
  }

  addProduct(product: Product)
  {
    this.products.push(product);
    this.productChanged.next(this.products.slice());
  }
  updateProduct(index: number, product: Product)
  {
    this.products[index] = product;
    this.productChanged.next(this.products.slice());
  }
  deleteProduct(index: number)
  {
    this.products.splice(index,1);
    this.productChanged.next(this.products.slice());
  }



  constructor() { }

}
