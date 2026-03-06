// import { HttpClient } from '@angular/common/http';
// import { Injectable ,inject} from '@angular/core';
// import { Product } from './product';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class UserApiService {

//   api_link="http://localhost:3001"
//   private _http= inject(HttpClient);

//   getAllCategory(){
//     return this._http.get(`${this.api_link}/category`)
//   }

//   getProductsByCategoryId(id: string): Observable<Product[]> {
//     return this._http.get<Product[]>(`http://localhost:3001/products/category/${id}`);
//   }

//   addToCart(data: { productID: string; userID: string }) {
//     return this._http.post<{ cart: { totalAmount: number } }>(`http://localhost:3001/carts`, data);
//   }
  
  
// }

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  api_link = "https://ecommerce-website-angular-3.onrender.com";
  private _http = inject(HttpClient);

  getAllCategory(){
    return this._http.get(`${this.api_link}/category`)
  }

  getProductsByCategoryId(id: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.api_link}/products/category/${id}`);
  }

  addToCart(data: { productID: string; userID: string }) {
    return this._http.post<{ cart: { totalAmount: number } }>(`${this.api_link}/carts`, data);
  }

}