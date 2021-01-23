import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products=[];
  name:any;
  product:any;
  constructor(public ps:ProductsService,public router:Router,public cs:CartService) { }


   productCredentials:any;
  ngOnInit(): void {
    this.ps.getProducts(this.products).subscribe(
      res=>{
          this.products=res["products"];
          console.log(this.products)
      },
      err=>{alert("Something went wrong in reading users")}

    )

    
  }
  getProduct(Id:any){
    this.router.navigateByUrl(`productsinfo/${Id}`)
    console.log(Id);
  }
}
