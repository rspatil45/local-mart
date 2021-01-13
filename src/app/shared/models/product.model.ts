import { Token } from "@angular/compiler/src/ml_parser/lexer";

export class Product {
  public id: number;
  public name: string;
 public userId: string;
  public image: string;
  public description: string;
  public price: number;
  public quantity: number;
  public date : Date;
  public category: string;


  constructor(id: number, name: string, description: string, image: string,
    price: number, quantity: number, userId:string, category:string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.userId = userId;
    this.category = category;
  }
}
