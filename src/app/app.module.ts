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
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/' }, LoginauthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
