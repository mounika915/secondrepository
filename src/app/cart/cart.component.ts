import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartData=[];
items;
  constructor(public cs:CartService,public ar:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {

this.cs.getCartItems().subscribe(
  res=>{
    this.items=res["cart"]
    console.log("items.....",this.items)
  },
  err=>{
    console.log(err)
  } )    
  }
  // getItem(name:any){
  //   this.router.navigateByUrl(`cartinfo/${name}`)
  //   console.log(name);
  // }
remove(name:any){
  this.cs.deleteItem(name).subscribe(
    res=>{alert(res["message"])
  window.location.reload()
},
    err=>{console.log(err)}
  )
}








}
