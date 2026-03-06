// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3001'; 
//   constructor(private http: HttpClient) {}

//   signUp(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/signup`, userData);
//   }

//   signIn(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/signin`, credentials);
//   }

//   storeUserData(token: string, userId: string): void {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userId', userId);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getUserId(): string | null {
//     return localStorage.getItem('userId');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken(); 
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//   }

//   getAuthHeaders(): HttpHeaders {
//     const token = this.getToken();
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': token ? `Bearer ${token}` : ''
//     });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://ecommerce-website-angular-3.onrender.com';

  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  signIn(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  storeUserData(token: string, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
}