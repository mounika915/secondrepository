import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide=true;
  constructor(public as:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  } 
  typeStatus:boolean=false;
  //loginStatus:boolean=false;
  getLoginData(ref){
 let loginFormData=ref.value;
    console.log(loginFormData)
     //call method of authentication service to subscribe response
     if(loginFormData.Purchaser=="Purchaser"){
      this.as.getPurchaserToken(loginFormData).subscribe(
        res=>{
          if(res["message"]=="Invalid name"){
            alert("Invalid name")
            //this.loginStatus=true;
          }
          if(res["message"]=="Invalid password"){
           alert("Invalid password")
            //this.loginStatus=false;
          }
          else{
            res["status"]=="success"
            localStorage.setItem("token",res["message"])
            localStorage.setItem("purchasername",res["purchasername"])
            this.typeStatus=true;
            //as user logged in successfully navigate to userdashboard
            this.router.navigateByUrl("/Dashboard")
            
          }
           
        },
        err=>{
          console.log("error in login process",err)
          alert("Something went wrong in login process")}
        )
    }
    if(loginFormData.Seller=="Seller"){
      this.as.getSellerToken(loginFormData).subscribe(
        res=>{
          if(res["status"]=="failed"){
            alert(res["message"])
          }
          else{
            res["status"]=="success"
            localStorage.setItem("token",res["message"])
            localStorage.setItem("sellername",res["sellername"])
            //localStorage.setItem("typeStatus",false)
            this.typeStatus=false;
            //as user logged in successfully navigate to userdashboard
            this.router.navigateByUrl("/admindashboard")
            
          }
        },
        err=>{alert("Something went wrong in login process")}
      )
    }
  }
  }

