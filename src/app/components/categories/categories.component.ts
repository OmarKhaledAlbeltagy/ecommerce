import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

constructor(private _CategoriesService:CategoriesService){

}

allcategories:Category[] = [];

 async getCategories(){
  this._CategoriesService.getCategories().subscribe({
   next:(response) => {
    this.allcategories = response.data;
   }
  })
}

ngOnInit(): void {
  this.getCategories()

}

}
