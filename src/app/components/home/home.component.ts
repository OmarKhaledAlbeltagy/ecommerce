import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { SliderComponent } from "../slider/slider.component";
import { CategoriesService } from '../../core/services/categories.service';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategorySliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) {
    
  }




  
  allProducts: Product[] = [];

  getProducts(){
    this._ProductsService.getProducts().subscribe({
      next:(response) => {
        this.allProducts = response.data;
      },
      error:(error) => {console.log(error)}
    })
  }

  ngOnInit(): void {
    this.getProducts()

 
  }
}
