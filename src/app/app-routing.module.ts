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
import { NotFoundComponent } from './not-found/not-found.component';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: SudashboradComponent },
  // { path: 'dashboard', component: SudashboradComponent },
  { path: 'webinfo', canActivate: [AuthGuard] , component: WebInfoComponent},
  { path: 'shops', canActivate: [AuthGuard], component: ShopsComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'reset', component: ResetpasswordComponent},
  { path: 'mailinfo', canActivate: [AuthGuard], component: MailinfoComponent},
  { path: 'lockscreen', component: LockscreenComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'adminProfile', canActivate: [AuthGuard], component: AdminprofileComponent },
  { path: 'shopInfo', canActivate: [AuthGuard], component: ShopInfoComponent },
  { path: 'shopDetail', component: ShopDetailComponent  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
