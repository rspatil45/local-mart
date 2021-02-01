import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
interface response_format {

  id: number,
  name: string,
  description: string,
  image: string,
  price: number,
  quantity: number
  date: Date;
  user: any;
  category: string;
  publicUid: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  back_url = "http://localhost:8080";
  productChanged = new Subject<Product[]>();
  category = null;
  searchkeyword=null;
  categoryChanged = new Subject<string>();
  private products: Product[] = [];

  constructor(private http: HttpClient,private authService: AuthService) { }

  fetchProducts(postPerPage: number, currentPage: number) {
    const productList: Product[] = [];
    const queryParams = `?page=${currentPage}&limit=${postPerPage}`
    this.http.get<response_format[]>(this.back_url + "/products" + queryParams).subscribe(element => {
      element.forEach(element1 => {
        productList.push(element1);
      })
    })
    this.products = productList;
    this.productChanged.next(this.products);
  }

  fetchProductByCategory(category: string, postPerPage: number, currentPage: number) {
    let productList: Product[] = [];
    const queryParams = `?category=${category}&page=${currentPage}&limit=${postPerPage}`;
    this.http.get<Product[]>(this.back_url + "/products/category" + queryParams).subscribe(
      (fetchedData) => {
        fetchedData.forEach(element => {
          const obj1 = element;
          productList.push(obj1);
        })
      })
    this.products = null;
    this.products = productList;

    this.productChanged.next(this.products);
  }

  getProducts() {
    return this.products;
  }

  getProduct(index: number) {
    const id = `${index}`;
    return this.http.get<Product>(this.back_url + "/products/" + id);
  }

  updateProduct(product: any) {
    return this.http.put(this.back_url + "/products/update", product)
  }

  addProduct(product: any) {
    return this.http.post(this.back_url + "/products/new", product);
  }

  deleteProduct(idx: number) {
    const token = this.authService.currentUser.token;
    const id = `${idx}`;
    return this.http.delete<boolean>(this.back_url + "/products/" + id + "/" + token);
  }

  fetchCount() {
    return this.http.get(this.back_url + "/products/count/all");
  }

  fetchCountByCategory(category: string) {
    return this.http.get(this.back_url + "/products/count/" + category);
  }

  setCategory(category: string) {
    this.category = category;
    this.categoryChanged.next(category);
  }

  searchProduct(searchKeyword: string) {
    return this.http.get<Product[]>(this.back_url + "/products/search?keyword=" + searchKeyword);
  }

  fetchLatestProduct(){
    return this.http.get<Product[]>(this.back_url+"/products");
  }


}
