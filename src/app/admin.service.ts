import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  typeStatus:boolean=false;
  constructor(private hc:HttpClient) { }
  sellerRegistration(formData):Observable<any>{
    return this.hc.post("admin/register",formData)
  }
  //getting user
getSeller(name:string):Observable<any>{
  //http get req
  return this.hc.get(`/admin/read/${name}`)
}
//make req to update user credentials
updateSeller(sellerCredentials):Observable<any>{
  return this.hc.put("/admin/update",sellerCredentials)
}



//get req to get all users
getAdmins(admins):Observable<any>{
  return this.hc.get<any[]>("/admin/admins",admins);
}

}
