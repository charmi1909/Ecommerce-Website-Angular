import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form = {
    email: '',
    passwordHash: ''
  };

  private apiUrl = 'http://localhost:3001/auth';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  submit() {
    this.http.post(`${this.apiUrl}/reset-password`, this.form).subscribe({
      next: () => {
        this.toastr.success('Password updated. Please sign in.', 'Success');
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Server Error', 'Reset Failed');
      }
    });
  }
}

