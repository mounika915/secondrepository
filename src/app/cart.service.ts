import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  constructor(public hc:HttpClient) { }
addToCart(productData):Observable<any>{
  return this.hc.post<any>("/cart/add",productData)
}
//getting user
// getItem(name:string):Observable<any>{
//   //http get req
//   return this.hc.get(`/cart/read/${name}`)
// }
getCartItems():Observable<any>{
  return this.hc.get<any>("/cart/allItems")
}
deleteItem(name:string):Observable<any>{
  return this.hc.delete<any>(`/cart/delete/${name}`)
}
}
