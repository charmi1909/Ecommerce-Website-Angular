import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderData: any = { items: [], totalAmount: 0 };
  paymentMethod: string = '';
  namp: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private orderService: OrderService,
    private cartService: CartService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { orderData?: any };

    if (state?.orderData) {
      this.orderData = state.orderData;
      console.log("Received order data:", this.orderData);
    } else {
      this.toastr.error("⚠️ No order data received.", "Error");
    }
  }

  placeOrder() {
    if (!this.paymentMethod || !this.namp) {
      this.toastr.warning('⚠️ Please select a payment method and enter NAMP.', 'Warning');
      return;
    }

    const finalOrderData = {
      ...this.orderData,
      paymentMethod: this.paymentMethod,
      namp: this.namp
    };

    console.log("Final Order Data:", finalOrderData);
    this.toastr.info('🛍️ Placing your order...', 'Processing');

    this.orderService.placeOrder(finalOrderData).subscribe({
      next: () => {
        const userId = this.orderData.userId;
        if (userId) {
          this.cartService.clearUserCart(userId).subscribe();
        }
        this.toastr.success('🎉 Order placed successfully!', 'Success');
        this.router.navigate(['/order-confirmation']);
      },
      error: () => {
        this.toastr.error('Error placing order', 'Error');
      }
    });
  }
}
