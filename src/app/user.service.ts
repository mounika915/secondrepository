import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }
  userRegistration(formData):Observable<any>{
    return this.hc.post("user/register",formData)
  }
  //getting user
getPurchaser(name:string):Observable<any>{
  //http get req
  return this.hc.get(`/user/read/${name}`)
}
//make req to update user credentials
updatePurchaser(purchaserCredentials):Observable<any>{
  return this.hc.put("/user/update",purchaserCredentials)
}

//delete request to delete user
deleteProfile(name:string):Observable<any>{
  return this.hc.delete(`/user/delete/${name}`)
}

//get req to get all users
getUsers(users):Observable<any>{
  return this.hc.get<any[]>("/user/users",users);
}

}
