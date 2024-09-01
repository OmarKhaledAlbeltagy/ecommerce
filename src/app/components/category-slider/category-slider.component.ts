import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
  constructor(private _CategoriesService:CategoriesService){

  }
  Categories!:Category[];
  getAllCategories(){
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.Categories = res.data;
    
          
      }
    })
  }

  ngOnInit(): void {
    this.getAllCategories()
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    autoplay:true,
    autoplayMouseleaveTimeout:2500,
    autoplayHoverPause:false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 8
      },
      400: {
        items: 8
      },
      740: {
        items: 8
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

}
