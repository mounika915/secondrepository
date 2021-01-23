import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-productsinfo',
  templateUrl: './productsinfo.component.html',
  styleUrls: ['./productsinfo.component.css']
})
export class ProductsinfoComponent implements OnInit {
  constructor(public ar:ActivatedRoute,public ps:ProductsService,public cs:CartService,public router:Router) { }
productData:any;
item;
  ngOnInit(): void {
    this.ar.params.subscribe((routeRes)=>{
      //console.log("ar",routeRes)
     //to view individual companies
   this.ps.getProduct().subscribe( (serviceRes)=>{
     let productDetails;
     //console.log("sr",serviceRes)
     let arr=serviceRes["products"]
     //console.log(arr)
arr.filter(function(product:any){
if(routeRes.Id==product.Id){
  productDetails=product;
  //console.log(routeRes.Id)
}
})
if(productDetails){
  this.productData=productDetails
  //console.log(this.productData)
}
})
})


  }

addToCart(productData:any){
  this.cs.addToCart(this.productData).subscribe(
    res=>{alert(res["message"])},
    err=>{console.log(err)}
  )
}

   }


