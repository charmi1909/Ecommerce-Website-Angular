import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../services/product';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-on-sale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-on-sale.component.html',
  styleUrl: './item-on-sale.component.css'
})
export class ItemOnSaleComponent implements OnInit {
  bestSelling: Product[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cartService.getBestSellingProducts().subscribe({
      next: products => {
        this.bestSelling = products;
      }
    });
  }

  viewProduct(product: Product) {
    const categoryId = (product as any).category?._id;
    if (categoryId) {
      this.router.navigate(['/products', categoryId]);
    }
  }

  addToCart(product: Product) {
    if (!this.authService.isLoggedIn()) {
      this.toastr.warning('You must be logged in to add items to the cart.', 'Warning');
      return;
    }
    this.cartService.addToCart(product._id, 1, product.price).subscribe({
      next: () => {
        this.toastr.success('Product added to cart', 'Success');
      },
      error: () => {
        this.toastr.error('Failed to add product to cart', 'Error');
      }
    });
  }

  addToWishlist(product: Product) {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.toastr.warning('You must be logged in to use wishlist.', 'Warning');
      return;
    }
    this.wishlistService.addToWishlist(userId, product._id).subscribe({
      next: () => {
        this.toastr.success('Added to wishlist', 'Success');
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to add to wishlist', 'Error');
      }
    });
  }
}
