export class Product {
  public id: number;
  public name: string;
  //public owner_id: string;
  public imgPath: string;
  public description: string;
  public price: number;
  public quantity: number;

  constructor(id: number, name: string, description: string, imgPath: string,
    price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.price = price;
    this.quantity = quantity;
  }
}
