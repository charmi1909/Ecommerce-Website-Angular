import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  credentials = {
    email: '',
    passwordHash: ''
  };

  // private apiUrl = 'http://localhost:3001/auth';
  private apiUrl = 'https://ecommerce-website-angular-3.onrender.com/auth';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {} 

  onSignin() {
    this.http.post(`${this.apiUrl}/signin`, this.credentials).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId); 
        
        this.toastr.success('You have successfully signed in!', 'Signin Successful 🎉'); 
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.toastr.error(error.error?.message || 'Server Error', 'Signin Failed ❌'); 
      }
    });
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
