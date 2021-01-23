import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public hc:HttpClient) { }
  productRegistration(productData):Observable<any>{
    return this.hc.post("products/register",productData)
  }
  //for showproducts component
  getProducts(products):Observable<any>{
    return this.hc.get("/products/allProducts",products)
  }
  //for products component
  AllProducts(products):Observable<any>{
    return this.hc.get("/products/allProducts",products)
  }
  //to get one product
   //getting user
getProduct():Observable<any>{
  //http get req
  return this.hc.get<any>(`/products/read`);
}

}
