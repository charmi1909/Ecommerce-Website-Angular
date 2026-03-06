import { Component,inject } from '@angular/core';
import { UserApiService } from '../services/user-api.service';
import { Category } from '../services/category';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  imports:[NgFor,RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'], 
})
export class CategoryComponent{ 

  private _userApi=inject(UserApiService)
  categories:Category[] =[]
  ngOnInit(){
    this._userApi.getAllCategory().subscribe((res:any) =>{
      this.categories=res
      console.log(this.categories)
    })
    }
  }







