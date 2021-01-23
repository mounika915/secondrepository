import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  profileStatus:boolean=false;
  name:string;
  sellerCredentials:any;   
  constructor(public ad:AdminService,public as:AuthenticationService) { }

  ngOnInit(): void {
    
    //read username from localstorage
    this.name=localStorage.getItem("sellername");
    this.profileStatus=true;
    //get user obj
    this.ad.getSeller(this.name).subscribe(
      res=>{
        if(res["message"]=="Unauthorized user"){
          alert("You are unauthorized user,please sign in to view dashboard");
         }
         if(res["message"]=="Session is expired...Login to continue"){
          alert("Session is expired...please Login to continue");
         }
        else{this.sellerCredentials=res["message"]}},
    err=>{alert("something went wrong")}
    )
  }
  logout(){
    this.as.userLogout();
  }
  updateFormStatus:boolean=false;
  
    
    showUpdateForm(){
      this.updateFormStatus=true;
    }
     saveEditedData(ref:NgForm){
       //change status if user clicks save button to remove the form
       this.updateFormStatus=false;
       let sellerCredentials=ref.value;
       //console.log(sellerCredentials);
       //call updateUser method to receive response
       this.ad.updateSeller(sellerCredentials).subscribe(
         res=>{
           alert("User data is updated successfully")
           //replace new data with old data
           this.sellerCredentials=res["sellerCredentials"];
         },
         err=>{console.log(err)}
       ) 
        }
        
     
}
