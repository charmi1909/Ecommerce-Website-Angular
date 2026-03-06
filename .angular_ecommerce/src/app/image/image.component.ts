import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {

  constructor(private router: Router) {}

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  
  
}
