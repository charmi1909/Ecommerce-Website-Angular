import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../services/product';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-productlist',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  quantity: number = 1;
  categories: any[] = [];
  userId: string | null = null;
  private routeSub!: Subscription;
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private api = inject(UserApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  @Input() product: any;
  apiUrl = "http://localhost:3001/carts";

  constructor(private cartService: CartService, private authService: AuthService, private wishlistService: WishlistService) {}
  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id') || 'null';
      this.fetchProducts(id);
      this.fetchCategories(id);
    });
  }

  fetchProducts(id: string) {
    this.api.getProductsByCategoryId(id).subscribe({
      next: (res: Product[]) => {
        this.products = Array.isArray(res) ? res : [];
        console.log('Products loaded:', this.products);
      },
      error: () => this.toastr.error('❌ Error fetching products', 'Error')
    });
  }

  fetchCategories(categoryId: string) {
    this.api.getAllCategory().subscribe({
      next: (res: any) => {
        this.categories = Array.isArray(res) ? res.map(cat => ({
          ...cat, isChecked: cat._id === categoryId
        })) : [];
      },
      error: () => this.toastr.error('⚠️ Error fetching categories', 'Error')
    });
  }

  handleCategory(id: string) {
    this.router.navigate(['/products', id]);
    this.fetchProducts(id);
    this.fetchCategories(id);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  addToCart(productId: string, price: number): void {
    if (!this.authService.isLoggedIn()) {
      this.toastr.warning('⚠️ You must be logged in to add items to the cart.', 'Warning');
      return;
    }
  
    if (this.quantity < 1) this.quantity = 1;
  
    this.cartService.addToCart(productId, this.quantity, price).subscribe({
      next: () => {
        this.toastr.success('🛒 Product successfully added to cart!', 'Success');
      },
      error: () => {
        this.toastr.error('❌ Failed to add product to cart.', 'Error'); 
      }
    });
  }

  addToWishlist(productId: string): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.toastr.warning('⚠️ You must be logged in to use wishlist.', 'Warning');
      return;
    }
    this.wishlistService.addToWishlist(userId, productId).subscribe({
      next: () => {
        this.toastr.success('Added to wishlist', 'Success');
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to add to wishlist', 'Error');
      }
    });
  }
}
