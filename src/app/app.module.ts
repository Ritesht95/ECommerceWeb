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
<<<<<<< HEAD
import { CategoryComponent } from './category/category.component';
=======
import { IntialSetupComponent } from './intial-setup/intial-setup.component';
>>>>>>> 84dca4c234a9e5c7160098f3aedec40baa4b3ad1

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
<<<<<<< HEAD
    CategoryComponent
=======
    IntialSetupComponent
>>>>>>> 84dca4c234a9e5c7160098f3aedec40baa4b3ad1
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/' }, LoginauthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
