import { Injectable } from '@angular/core';
import {Product} from './models/product.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
interface response_format
{

    id : number,
    name: string,
    description: string,
    image: string,
    price: number,
    quantity: number
    date: Date;
    userId: string;
    category:string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  imgAuthor = "https://avatars1.githubusercontent.com/u/50131992?s=460&u=0b23be4aeef4a73d37f7657a00def910cdf1c4ae&v=4";
  img2 ="https://img.jakpost.net/c/2019/11/12/2019_11_12_82229_1573532922._large.jpg";
  img = "https://image.shutterstock.com/image-photo/pav-bhaji-fast-food-dish-260nw-1133164979.jpg";
  img3 = "https://image.shutterstock.com/image-photo/clay-pot-plate-isolated-on-260nw-556962304.jpg";

  productChanged = new Subject<Product[]>();
  category = null;
  categoryChanged = new Subject<string>();
  private products : Product[] =[];

  //   new Product(1,"pavbhaji","nice product",this.img,50,12),
  //   new Product(2,"Burger King","nice product",this.img2,50,12),
  //   new Product(3,"matka","nice matka made in india",this.img3,100,12),
  //   new Product(4,"Rahul Patil","Mean Stack developer",this.imgAuthor,0,1)
  // ];

    fetchProducts(postPerPage: number,currentPage: number){
    const productList: Product[] = [];
     const queryParams = `?page=${currentPage}&limit=${postPerPage}`
     this.http.get<response_format[]>("http://localhost:8080/products" +queryParams).subscribe(element=>{
      element.forEach(element1=>{
        const obj1 = {
          id : element1.id,
          name : element1.name,
          description : element1.description,
          image : element1.image,
          price : element1.price,
          quantity : element1.quantity,
          userId : element1.userId,
          category: element1.category,
          date : element1.date
        }
        productList.push(obj1);
      })

    })
    this.products = productList;
    this.productChanged.next(this.products);
  }

  fetchProductByCategory(category:string,postPerPage:number,currentPage:number)
  {
    let productList:Product[]=[];
    const queryParams = `?category=${category}&page=${currentPage}&limit=${postPerPage}`;
    this.http.get<Product[]>("http://localhost:8080/products/category"+ queryParams).subscribe(
      (fetchedData)=>{
        fetchedData.forEach(element=>{
          const obj1 = element;
          productList.push(obj1);
        })
      })

    this.products = productList;
      console.log(this.products);
    this.productChanged.next(this.products);
  }

  getProducts(){
    return this.products;
  }
  getProduct(index: number){
    const id = `${index}`;
    return this.http.get<response_format>("http://localhost:8080/products/"+id);
  }

  updateProduct(index: number, product: Product)
  {
    // this.products[index] = product;
    // this.productChanged.next(this.products.slice());
  }
  deleteProduct(id: number)
  {
    // this.products.splice(id,1);
    // this.productChanged.next(this.products);
  }
  fetchCount(){

     return this.http.get("http://localhost:8080/products/count")
  }
  setCategory(category: string)
  {
    this.category = category;
    this.categoryChanged.next(category);
  }


  constructor(private http: HttpClient) {


  }

}
