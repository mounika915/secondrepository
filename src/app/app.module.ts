import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/Forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductsinfoComponent } from './productsinfo/productsinfo.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchaserComponent } from './purchaser/purchaser.component';
import { SellerComponent } from './seller/seller.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { ShowusersComponent } from './showusers/showusers.component';
import { CartinfoComponent } from './cartinfo/cartinfo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductsinfoComponent,
    CartComponent,
    RegisterComponent,
    DashboardComponent,
    PurchaserComponent,
    SellerComponent,
    LoginComponent,
    AdmindashboardComponent,
    ShowproductsComponent,
    AddproductsComponent,
    ShowusersComponent,
    CartinfoComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
