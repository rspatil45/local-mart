import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKeyword:null;
  constructor(private proService: ProductService) { }

  ngOnInit(): void {
  }


  OnSearchSomething(){
    if(!this.searchKeyword)
      return
    this.proService.searchProduct(this.searchKeyword).subscribe(
      searchResult=>{
        this.proService.productChanged.next(searchResult);
      }

    )
  }

}
