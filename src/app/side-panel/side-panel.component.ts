import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  categories = ["grocerry","daily essentials","other","handicraft"]
  constructor(private proService : ProductService) { }
  onSetCategory(ctgr: string){
    this.proService.setCategory(ctgr);
    //console.log(ctgr);
  }
  ngOnInit(): void {
  }

}
