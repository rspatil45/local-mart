import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editMode = false;
  product: Product=null;
  success_message="";
  error_message="";
  imageurl = "";
  @ViewChild('f') form:NgForm;
  constructor(private proService:ProductService ,private http: HttpClient,
    private authService : AuthService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      //console.log(params);
      if(params.editId)
      {
        // console.log(params.editId);
        this.editMode = true;
        this.proService.getProduct(params.editId).subscribe(product=>{
          this.product = product;
          this.onSetForm();
        })
      }
    })
  }
  onCancel(){
    this.router.navigate(['../']);
  }

  onSetForm(){
    //console.log(this.product);
    //this.form.value.item_name = this.product.name;
    this.form.controls['item_name'].patchValue(this.product.name);
    this.form.controls['image'].patchValue(this.product.image);
    this.form.controls['category'].patchValue(this.product.category);
    this.form.controls['description'].patchValue(this.product.description);
    this.form.controls['price'].patchValue(this.product.price);
    this.form.controls['quantiry'].patchValue(this.product.quantity);
    //console.log(this.form);
  }

  onSubmit(form: NgForm){
    //console.log(form.value.category);
    if(!this.editMode)
    {
      //not edit mode means we are adding new product

      var product = {
        name : form.value.item_name,
        image : form.value.image,
        description : form.value.description,
        price: form.value.price,
        quantity : form.value.quantity,
        category : form.value.category,
        userId : this.authService.currentUser.userId,
        token: this.authService.currentUser.token
      }
      this.proService.addProduct(product).subscribe(item=>{
        this.success_message = "product added successfully";
          form.reset();
        },error=>{
         this.error_message=error.error.message;
        }
      )

    }
    else{
      //is in edit mode so update it
      var productToUpdate = {
        id :this.product.id,
        name : form.value.item_name,
        image : form.value.image,
         description: form.value.description,
        price: form.value.price,
        quantity : form.value.quantity,
        category: form.value.category,
        token : this.authService.currentUser.token
      }

      this.proService.updateProduct(productToUpdate).subscribe(item=>{
        this.success_message = "product updated successfully";
        form.reset();
      },error=>{
      this.error_message=error.error.message;
      }
      )

    }
  }


}
