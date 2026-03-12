import { Component } from '@angular/core';
import { OrganicShareComponent } from '../organic-share/organic-share.component';
import { CategoryComponent } from '../category/category.component';
import { DailyOffersComponent } from '../daily-offers/daily-offers.component';
import { DiscountComponent } from '../discount/discount.component';
import { DownloadAppComponent } from '../download-app/download-app.component';
import { ImageComponent } from '../image/image.component';
import { ItemOnSaleComponent } from '../item-on-sale/item-on-sale.component';
import { OurrecentBlogsComponent } from '../ourrecent-blogs/ourrecent-blogs.component';
import { PeopleLookingForComponent } from '../people-looking-for/people-looking-for.component';
import { TopRecommendationsComponent } from '../top-recommendations/top-recommendations.component';

@Component({
  selector: 'app-home-page',
  imports: [OrganicShareComponent,CategoryComponent,DailyOffersComponent,DiscountComponent,DownloadAppComponent,ImageComponent,ItemOnSaleComponent ,OurrecentBlogsComponent,PeopleLookingForComponent, TopRecommendationsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {




}
