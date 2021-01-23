import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtectGuard implements CanActivate {
  canActivate():boolean {
    //check token if exists make access 
    //first get token
    let token=localStorage.getItem("token")
    if(token){
      return true;
    }
    else{
      alert("You are not an authorized user,Please login to view dashboard")
      return false;
      //as user is unauthorized 
      
      
    }
  }
  
}
