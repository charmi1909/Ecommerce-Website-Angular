import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const el = document.getElementById('preloader');
      if (el) (el as HTMLElement).style.display = 'none';
    }, 400);
  }

  goToCart(){
    this.router.navigate(['/carts'])
  }

    goToOrderHistory(){
    this.router.navigate(['/order-history'])
  }

   goToWishlist(){
    this.router.navigate(['/wishlist'])
  }


  navigateToSignup() {
    this.router.navigate(['/signin']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }



}
