import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  products=[];
  constructor(public ps:ProductsService) { }
profileStatus:boolean=true;
  ngOnInit(): void {
    this.ps.getProducts(this.products).subscribe(
      res=>{
          this.products=res["products"];
          this.profileStatus=false;
          console.log(this.products)
      },
      err=>{alert("Something went wrong in reading users")}

    )
  }

}
