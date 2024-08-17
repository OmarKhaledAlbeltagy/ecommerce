import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
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
