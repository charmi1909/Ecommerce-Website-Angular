import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { Product } from '../services/product';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../wishlist.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;

  private route = inject(ActivatedRoute);
  private api = inject(UserApiService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    } else {
      this.loading = false;
    }
  }

  private loadProduct(id: string): void {
    this.api.getAllProducts().subscribe({
      next: (products) => {
        const found = products.find(p => p._id === id);
        this.product = found ? new Product(found) : null;
        if (this.product) {
          this.relatedProducts = products
            .filter(p => p._id !== this.product!._id && p.category._id === this.product!.category._id)
            .slice(0, 6)
            .map(p => new Product(p));
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Failed to load product details', 'Error');
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;
    if (!this.authService.isLoggedIn()) {
      this.toastr.warning('You must be logged in to add items to cart.', 'Warning');
      return;
    }
    this.cartService.addToCart(this.product._id, 1, this.product.price).subscribe({
      next: () => this.toastr.success('Product added to cart', 'Success'),
      error: () => this.toastr.error('Failed to add product to cart', 'Error')
    });
  }

  addToWishlist(): void {
    if (!this.product) return;
    const userId = this.authService.getUserId();
    if (!userId) {
      this.toastr.warning('You must be logged in to use wishlist.', 'Warning');
      return;
    }
    this.wishlistService.addToWishlist(userId, this.product._id).subscribe({
      next: () => this.toastr.success('Added to wishlist', 'Success'),
      error: (error) => this.toastr.error(error.error?.message || 'Failed to add to wishlist', 'Error')
    });
  }
}

