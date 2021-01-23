import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-purchaser',
  templateUrl: './purchaser.component.html',
  styleUrls: ['./purchaser.component.css']
})
export class PurchaserComponent implements OnInit {
  hide=true;
password:any;        
  constructor(private router:Router,public us:UserService) { }
 //registrationStatus:boolean=false;
 file:File;
 incomingfile(event)
{
     this.file= event.target.files[0];
     }

     formData=new FormData();
  
  ngOnInit(): void {
  }
  //successStatus:boolean=false;
  
  getPurchaserData(ref){
    let purchaserData=ref.value;
    console.log(purchaserData)
    //adding image and other data to FormData object
    this.formData.append('profilepic',this.file,this.file.name);
         
    this.formData.append("purchaserData",JSON.stringify(purchaserData))
  
    //get data from service
    //call method from service
    this.us.userRegistration(this.formData).subscribe(
      res=>{
        if(res["message"]=="Registration is success"){
          //this.successStatus=true;
          //console.log(this.successStatus)
          alert("Registration is success")
        }
        if(res["message"]=="this name is already existed"){
          //this.successStatus=false;
          //console.log(this.successStatus)
          alert("this name is already existed")
        }
      },
      err=>{console.log(err)}
    )
  }
}
