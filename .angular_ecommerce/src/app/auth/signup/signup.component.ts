import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-signup',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: any = {  
    name: '',
    email: '',
    passwordHash: ''
  };

  // private apiUrl = 'http://localhost:3001/auth';
  private apiUrl = 'https://ecommerce-website-angular-3.onrender.com/auth';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {} 

  onSignup() {
    this.http.post(`${this.apiUrl}/signup`, this.user) 
      .subscribe({
        next: () => {
          this.toastr.success('Account created successfully!', 'Signup Successful 🎉', {
            timeOut: 3000,  
            progressBar: true,
          });

          this.router.navigate(['/signin']);
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Server Error', 'Signup Failed ❌', {
            timeOut: 3000,
            progressBar: true,
          });
        }
      });
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }
}
