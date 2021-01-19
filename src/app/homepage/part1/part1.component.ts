import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component implements OnInit {
   @Input('product') latest_products:Product[];

  constructor(private proService: ProductService) { }

  ngOnInit(): void {

  }

}
