import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    //check for existence of token
    let storedToken=localStorage.getItem("token");
    //if token exists
    if(storedToken){
      //add token to the req header obj
      let clonedReq=req.clone({
        headers:req.headers.set("interceptor","Bearer "+storedToken)
      })
      //forward to next interceptor or backend
      return next.handle(clonedReq)
    }
    else{
      return next.handle(req)
    }
  }

}
