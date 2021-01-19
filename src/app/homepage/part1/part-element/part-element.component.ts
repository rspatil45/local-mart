import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-part-element',
  templateUrl: './part-element.component.html',
  styleUrls: ['./part-element.component.css']
})
export class PartElementComponent implements OnInit {

  @Input('product') product:Product;
  show = true;
  index : number;
  onDetail(){
    this.router.navigate(["/products/"+this.product.id]);
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.show = false;
    },1000);
    this.index = this.product.id;
  }

}
