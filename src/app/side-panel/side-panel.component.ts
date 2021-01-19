import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  public x = "";
  categories = ["grocery","daily essentials","other","handicraft"]
  constructor(private proService : ProductService, private router: Router) { }
  onSetCategory(ctgr: string){
    setTimeout(()=>{
    this.proService.setCategory(ctgr);
   },10);
   //this.router.navigate(['../']);

    //console.log(ctgr);
  }
  ngOnInit(): void {
  }

}
