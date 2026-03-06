import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  // private baseUrl = 'http://localhost:3001/wishlists'; 
  private baseUrl = 'https://ecommerce-website-angular-3.onrender.com/wishlists';

  constructor(private http: HttpClient) {}

  getWishlist(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addToWishlist(userId: string, productId: string): Observable<any> {
    return this.http.post(this.baseUrl, { userId, productId });
  }

  removeFromWishlist(userId: string, productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${productId}`);
  }
}
