import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //inject http client obj
  constructor(public hc:HttpClient,private router:Router) { }
  //user login method to make post req
  getPurchaserToken(purchaserCredentials):Observable<any>{
    return this.hc.post("/user/login",purchaserCredentials)
  }

  getSellerToken(sellerCredentials):Observable<any>{
    return this.hc.post("admin/login",sellerCredentials)
  }

//sign in process
usersignin(){
  this.router.navigateByUrl("/login")
}

 //logout mechanism
 userLogout(){
  localStorage.clear();
  //as user is logged out navigate him to home page
  this.router.navigateByUrl("/Home")
}

  
}
