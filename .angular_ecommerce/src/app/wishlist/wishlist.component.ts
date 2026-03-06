import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../wishlist.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

interface WishlistItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  items: WishlistItem[] = [];
  loading = true;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.loading = false;
      return;
    }
    this.wishlistService.getWishlist(userId).subscribe({
      next: wishlist => {
        const products = wishlist.products || [];
        this.items = products.map((item: any) => ({
          _id: item.product?._id,
          productId: item.product?._id,
          name: item.product?.name,
          price: item.product?.price,
          imageUrl: Array.isArray(item.product?.images) ? item.product.images[0] : ''
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addToCart(item: WishlistItem) {
    const userId = this.authService.getUserId();
    if (!userId) {
      return;
    }
    this.cartService.addToCart(item.productId, 1, item.price).subscribe({
      next: () => {
        this.toastr.success('Product added to cart', 'Success');
      },
      error: () => {
        this.toastr.error('Failed to add product to cart', 'Error');
      }
    });
  }

  remove(item: WishlistItem) {
    const userId = this.authService.getUserId();
    if (!userId) {
      return;
    }
    this.wishlistService.removeFromWishlist(userId, item.productId).subscribe({
      next: () => {
        this.items = this.items.filter(x => x.productId !== item.productId);
        this.toastr.success('Removed from wishlist', 'Success');
      },
      error: () => {
        this.toastr.error('Failed to remove item', 'Error');
      }
    });
  }
}

