import { Token } from "@angular/compiler/src/ml_parser/lexer";

export class Product {
  public id: number;
  public name: string;
 public user:any;
  public image: string;
  public description: string;
  public price: number;
  public quantity: number;
  public date : Date;
  public category: string;
  public publicUid : string;


  constructor(id: number, name: string, description: string, image: string,
    price: number, quantity: number, publicUid:string, category:string, user:any) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.user.id = id;
    this.publicUid = publicUid;
    this.category = category;
  }
}
