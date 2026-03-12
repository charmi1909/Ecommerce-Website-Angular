import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

interface CartItem {
  _id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartId: string = localStorage.getItem('cartId') || ''; 
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private cartService: CartService, 
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/signin']);
      return;
    }
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.errorMessage = '';
    this.cartService.getCart(localStorage.getItem('userId')).subscribe({
      next: (cart: any) => {  
        if (cart && cart._id) {
          this.cartId = cart._id; 
        }

        if (cart && cart.items) {
          this.cartItems = cart.items.map((item: any) => ({
            _id: item._id,
            productId: item.productId?._id, 
            productName: item.productId?.name,
            price: item.productId?.price,
            quantity: item.quantity,
            imageUrl: Array.isArray(item.productId?.images) ? item.productId.images[0] : ''
          }));
        } else {
          this.cartItems = [];
        }
        this.loading = false;
      },
      error: () => {
        this.cartItems = [];
        this.loading = false;
      }
    });
  }

  updateQuantity(item: { _id: string; quantity: number }, newQuantity: number) {
    if (newQuantity < 1) return; 

    if (!this.cartId) {
      this.toastr.error("Cart ID is missing. Please refresh the page.", 'Update Failed');
      return;
    }

    this.cartService.updateCartItem(this.cartId, item._id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity; 
        this.toastr.success("Quantity updated successfully", 'Success');
      },
      error: () => {
        this.toastr.error("Error updating quantity", 'Error');
      }
    });
  }

  checkout() {
    const userId = this.authService.getUserId(); 

    if (!userId) {
      return;
    }

    const orderData = {
      userId: userId, 
      items: this.cartItems.map(item => ({
        productId: item.productId,  
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: this.getTotalPrice(),  
      status: "pending"
    };

    this.router.navigate(['/order'], { state: { orderData } });
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item._id !== productId); 
        this.toastr.success('Item removed from cart', 'Success');
      },
      error: () => {
        this.toastr.error("Failed to remove item. Please try again.", 'Error');
      }
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
