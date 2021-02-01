import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKeyword="";
  constructor(private proService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.searchKeyword = this.proService.searchkeyword;
  }


  OnSearchSomething(){
    this.proService.searchkeyword = this.searchKeyword;
    if(!this.searchKeyword)
      return;
    this.router.navigate(['/products']);
    this.proService.searchProduct(this.searchKeyword).subscribe(
      searchResult=>{
        this.proService.productChanged.next(searchResult);
      }
    )
  }

}
