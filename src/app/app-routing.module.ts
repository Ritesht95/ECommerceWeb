import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SudashboradComponent } from './sudashborad/sudashborad.component';
import { WebInfoComponent } from './web-info/web-info.component';
import { AuthGuard } from './auth.guard';
import { ShopsComponent } from './shops/shops.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MailinfoComponent } from './mailinfo/mailinfo.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { ShopInfoComponent } from './shop-info/shop-info.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: SudashboradComponent },
  // { path: 'dashboard', component: SudashboradComponent },
  { path: 'webinfo', component: WebInfoComponent},
  { path: 'shops', component: ShopsComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'reset', component: ResetpasswordComponent},
  { path: 'mailinfo', component: MailinfoComponent},
  { path: 'adminProfile', canActivate: [AuthGuard], component: AdminprofileComponent },
  { path: '**', redirectTo: 'not-found' },
  { path: 'adminProfile', component: AdminprofileComponent },
  { path: 'shopInfo', component: ShopInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
