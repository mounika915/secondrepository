import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CartComponent } from './cart/cart.component';
import { CartinfoComponent } from './cartinfo/cartinfo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductsinfoComponent } from './productsinfo/productsinfo.component';
import { ProfileComponent } from './profile/profile.component';
import { ProtectGuard } from './protect.guard';
import { PurchaserComponent } from './purchaser/purchaser.component';
import { RegisterComponent } from './register/register.component';
import { SellerComponent } from './seller/seller.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { ShowusersComponent } from './showusers/showusers.component';

const routes: Routes = [
  {path:"Home",component:HomeComponent},
  {path:"Products",component:ProductsComponent},
  {path:"Register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"profile",component:ProfileComponent},
  {path:"productsinfo/:Id",component:ProductsinfoComponent},
  {path:"cartinfo/:name",component:CartinfoComponent},
  {path:"Dashboard",component:DashboardComponent,children:[{path:"cart",component:CartComponent}],canActivate:[ProtectGuard]},
  {path:"admindashboard",component:AdmindashboardComponent,children:[{path:"showproducts",component:ShowproductsComponent},
  {path:"addproducts",component:AddproductsComponent},{path:"showusers",component:ShowusersComponent}],canActivate:[ProtectGuard]},
  {path:"user/purchaser",component:PurchaserComponent},
  {path:"admin/seller",component:SellerComponent},
  {path:"",redirectTo:"/Home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
