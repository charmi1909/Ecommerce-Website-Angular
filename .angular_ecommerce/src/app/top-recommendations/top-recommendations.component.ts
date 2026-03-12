import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { Product } from '../services/product';

@Component({
  selector: 'app-top-recommendations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-recommendations.component.html',
  styleUrls: ['./top-recommendations.component.css']
})
export class TopRecommendationsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  private api = inject(UserApiService);

  ngOnInit(): void {
    this.api.getAllProducts().subscribe({
      next: (res) => {
        const list = Array.isArray(res) ? res.map(p => new Product(p)) : [];
        // Sort by rating desc then fallback to original order, take top 8
        this.products = list
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 8);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

