import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SudashboradComponent } from './sudashborad/sudashborad.component';
import { WebInfoComponent } from './web-info/web-info.component';
import { LoginauthService } from './loginauth.service';
import { AuthGuard } from './auth.guard';
import { ShopsComponent } from './shops/shops.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MailinfoComponent } from './mailinfo/mailinfo.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { DataTablesModule } from 'angular-datatables';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { CategoryComponent } from './category/category.component';
import { IntialSetupComponent } from './intial-setup/intial-setup.component';
import { ShopauthGuard } from './shopauth.guard';
import { ShopDashboardComponent } from './shop-dashboard/shop-dashboard.component';
import { ProductDataComponent } from './product-data/product-data.component';
import { ProductComponent } from './product/product.component';
import { CategoryDataComponent } from './category-data/category-data.component';
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SucategoryComponent } from './sucategory/sucategory.component';
import { SuproductComponent } from './suproduct/suproduct.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SudashboradComponent,
    HeaderComponent,
    SidebarComponent,
    SudashboradComponent,
    WebInfoComponent,
    ShopsComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    MailinfoComponent,
    AdminprofileComponent,
    NotFoundComponent,
    ShopInfoComponent,
    LockscreenComponent,
    ShopDetailComponent,
    CategoryComponent,
    IntialSetupComponent,
    IntialSetupComponent,
    ProductComponent,
    ShopDashboardComponent,
    ProductDataComponent,
    CategoryDataComponent,
    ShopProfileComponent,
    ContactComponent,
    AboutUsComponent,
    SucategoryComponent,
    SuproductComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/' }, LoginauthService, AuthGuard, ShopauthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
