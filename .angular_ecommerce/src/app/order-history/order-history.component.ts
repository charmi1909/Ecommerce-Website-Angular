import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service'; 
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  orderData: any = { items: [] };
  userId: string | null = null; 
  currentDate: string = '';

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.currentDate = new Date().toLocaleDateString();
    this.userId = this.authService.getUserId(); 
    if (this.userId) {
      this.loadOrders();
    } else {
      console.error('User ID not found, user may not be logged in.');
    }
  }

  loadOrders() {
    if (!this.userId) return;
    this.orderService.getUserOrders(this.userId).subscribe(
      (data) => {
        this.orders = data.map((order:any) => ({
          ...order,
          userName: order.userId.name || 'Unknown User',
          items: order.items.map((item: any) => ({
            ...item,
            productName: item.productId?.name || item.productName || 'Unknown Product',
            imageUrl: Array.isArray(item.productId?.images) ? item.productId.images[0] : ''
          }))
        }));
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getTotalPrice(order: any): number {
    if (!order.items || order.items.length === 0) return 0; 
    return order.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'delivered':
        return 'status-delivered';
      default:
        return 'status-default';
    }
  }
  
}
