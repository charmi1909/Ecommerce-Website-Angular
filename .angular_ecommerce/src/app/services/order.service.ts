import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  // private apiUrl = 'http://localhost:3001/order';
  private apiUrl = 'https://ecommerce-website-angular-3.onrender.com/order';

constructor(private http: HttpClient) {}

  getUserOrders(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
  
  placeOrder(orderData: any): Observable<any> {  
    return this.http.post(`${this.apiUrl}`, orderData);
  }
  
}
