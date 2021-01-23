import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  constructor(public ps:ProductsService) { }
  file:File;
 		 incomingfile(event)
  {
  			  this.file= event.target.files[0];
    		  }

          formData=new FormData();
  ngOnInit(): void {
  }
  profileStatus:boolean=true;
  addProducts(ref){
    let productsData=ref.value;
    console.log(productsData)
    this.profileStatus=false;
    //adding image and other data to FormData object
    this.formData.append('profilepic',this.file,this.file.name);
         
    this.formData.append("productsData",JSON.stringify(productsData))
  
    //get data from service
    //call method from service
    this.ps.productRegistration(this.formData).subscribe(
      res=>{
        alert("Your product is added successfully")
        window.location.reload()
      },
      err=>{console.log(err)}
    )
  }
}
