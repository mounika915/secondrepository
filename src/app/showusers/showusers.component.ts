import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html',
  styleUrls: ['./showusers.component.css']
})
export class ShowusersComponent implements OnInit {
users=[];
  constructor(public us:UserService) { }
  //profileStatus:boolean=true;
  ngOnInit(): void {
    this.us.getUsers(this.users).subscribe(
      res=>{
          this.users=res["users"];
          console.log(this.users)
          //this.profileStatus=false;
      },
      err=>{alert("Something went wrong in reading users")}

    )
  }

  

}
