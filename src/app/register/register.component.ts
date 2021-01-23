import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router:Router,public as:AuthenticationService) { }
  registerData(ref:NgForm){
    let Data=ref.value;
    console.log(Data);
  if(Data.Purchaser=="Purchaser"){
    this.router.navigateByUrl("/user/purchaser")
  }
  if(Data.Seller=="Seller"){
  this.router.navigateByUrl("/admin/seller")
  }
  }
  ngOnInit(): void {
  }
signin(){
  this.as.usersignin();
}
}
