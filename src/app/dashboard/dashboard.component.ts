import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AuthenticationService } from '../authentication.service';
import {UserService} from '../user.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
name:string;
purchaserCredentials:any;
                                                                                                                                                                                                 
  constructor(public as:AuthenticationService,public ad:AdminService,public us:UserService) { }

  ngOnInit(): void {
    //read username from localstorage
    this.name=localStorage.getItem("purchasername");
    //get user obj
    this.us.getPurchaser(this.name).subscribe(
      res=>{
        if(res["message"]=="Unauthorized user"){
          alert("You are unauthorized user,please sign in to view dashboard");
         }
         if(res["message"]=="Session is expired...Login to continue"){
          alert("Session is expired...please Login to continue");
         }
        else{this.purchaserCredentials=res["message"]}},
    err=>{alert("something went wrong")}
    )
  }
  //call userLogout method to log out
logout(){
  this.as.userLogout();
}
updateFormStatus:boolean=false;
  showUpdateForm(){
     //change status if user clicks update button to show the form
     this.updateFormStatus=true;
  }
  saveEditedData(ref:NgForm){
    //change status if user clicks save button to remove the form
    this.updateFormStatus=false;
    let purchaserCredentials=ref.value;
    //console.log(sellerCredentials);
    //call updateUser method to receive response
    this.us.updatePurchaser(purchaserCredentials).subscribe(
      res=>{
        alert("User data is updated successfully")
        //replace new data with old data
        this.purchaserCredentials=res["purchaserCredentials"];
      },
      err=>{console.log(err)}
    ) 
     }
      
   // call deleteuser method to remove user
   deleteUser(){
    
    this.us.deleteProfile(this.purchaserCredentials.name).subscribe(
      res=>{
        alert("profile is deleted")},
       
      err=>{console.log(err)}
    )
  }  
  }
 

