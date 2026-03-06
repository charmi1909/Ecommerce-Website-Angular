import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  // private apiUrl = 'http://localhost:3001/carts';
  private apiUrl = 'https://ecommerce-website-angular-3.onrender.com/carts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("User is not authenticated. Token missing.");
      throw new Error("User is not authenticated");
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  

 
  getBestSellingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3001/products/best-selling')
      .pipe(catchError(error => {
        console.error("Error fetching best-selling products:", error);
        return throwError(() => error);
      }));
  }

  addToCart(productId: string, quantity: number, price: number): Observable<any> {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert("User ID is missing. User might not be logged in.");
      throw new Error("User is not logged in");
    }

    const body = { userId, productId, quantity, price };
    return this.http.post(this.apiUrl, body)
      .pipe(catchError(error => {
        console.error("Error adding product to cart:", error);
        return throwError(() => error);
      }));
  }

  updateCartItem(cartId: string, itemId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartId}/items/${itemId}`, { quantity });
  }
  


  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}` )
      .pipe(catchError(error => {
        console.error("Error removing product from cart:", error);
        return throwError(() => error);
      }));
  }

  getCart(id:any): Observable<{ items: any[] }> {
    return this.http.get<{ items: any[] }>(this.apiUrl+'/'+id)
      .pipe(catchError(error => {
        console.error("Error fetching cart:", error);
        return throwError(() => error);
      }));
  }

  clearCart(cartId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartId}`)
      .pipe(catchError(error => {
        console.error("Error clearing cart:", error);
        return throwError(() => error);
      }));
  }

  clearUserCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${userId}`)
      .pipe(catchError(error => {
        console.error("Error clearing cart:", error);
        return throwError(() => error);
      }));
  }
}
