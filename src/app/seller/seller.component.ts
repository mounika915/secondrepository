import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  hide=true;
  constructor(public ad:AdminService) { }
  registrationStatus:boolean=false;
  file:File;
 incomingfile(event)
{
     this.file= event.target.files[0];
     }

     formData=new FormData();
  
  ngOnInit(): void {
  }
  getSellerData(ref){
    let sellerData=ref.value;
    console.log(sellerData)
     //adding image and other data to FormData object
     this.formData.append('profilepic',this.file,this.file.name);
         
     this.formData.append("sellerData",JSON.stringify(sellerData))
   
    this.ad.sellerRegistration(this.formData).subscribe(
      res=>{alert(res["message"])},
      err=>{console.log(err)}
    )
  }
}
