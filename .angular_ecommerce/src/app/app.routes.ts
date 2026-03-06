import { NgModule } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterLink, RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { ProductlistComponent } from './productlist/productlist.component';
import { CommonModule } from '@angular/common';
import { authInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authGuard } from './services/auth.guard';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'products', component: ProductlistComponent, canActivate: [authGuard] },
  { path: 'products/:id', component: ProductlistComponent, canActivate: [authGuard] },
  { path: 'carts', component: CartComponent, canActivate: [authGuard] },
  { path: 'order', component: OrderComponent, canActivate: [authGuard] },
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [authGuard] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ToastrModule.forRoot(),CommonModule,BrowserAnimationsModule],
  exports: [RouterModule],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptorInterceptor, multi: true}
  ]
})
export class AppRoutingModule { }