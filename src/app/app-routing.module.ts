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
import { CategoryComponent } from './category/category.component';
import { IntialSetupComponent } from './intial-setup/intial-setup.component';
import { ProductComponent } from './product/product.component';
import { ShopauthGuard } from './shopauth.guard';
import { ProductDataComponent } from './product-data/product-data.component';
import { CategoryDataComponent } from './category-data/category-data.component';
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { ShopDashboardComponent } from './shop-dashboard/shop-dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SucategoryComponent } from './sucategory/sucategory.component';
import { SuproductComponent } from './suproduct/suproduct.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OrderComponent } from './order/order.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: SudashboradComponent },
  { path: 'shopdashboard', canActivate: [ShopauthGuard], component: ShopDashboardComponent },
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
  { path: 'category', canActivate: [ShopauthGuard], component: CategoryComponent },
  { path: 'shopDetail', canActivate: [AuthGuard], component: ShopDetailComponent  },
  { path: 'initial-setup', component: IntialSetupComponent },
  { path: 'product', canActivate: [ShopauthGuard], component: ProductComponent },
  { path: 'productData', canActivate: [ShopauthGuard], component: ProductDataComponent },
  { path: 'categoryData', canActivate: [ShopauthGuard], component: CategoryDataComponent},
  { path: 'shopProfile', canActivate: [ShopauthGuard], component: ShopProfileComponent},
  { path: 'contactUs', canActivate: [ShopauthGuard], component: ContactComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'sucategory', canActivate: [AuthGuard], component: SucategoryComponent },
  { path: 'suproduct', canActivate: [AuthGuard], component: SuproductComponent },
  { path: 'feedback', component: FeedbackComponent},
  { path: 'orderDetail', component: OrderComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
