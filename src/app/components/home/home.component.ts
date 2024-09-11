import { Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { SliderComponent } from "../slider/slider.component";
import { CategoriesService } from '../../core/services/categories.service';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { RouterLink } from '@angular/router';
import { wishList } from '../../core/interfaces/wishlist';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategorySliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _wishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  allProducts: Product[] = [];
  wishList!:wishList;

getWishlist(){
  this._wishlistService.getWishlist().subscribe({
    next:(res)=>{
      this.wishList = res as wishList;
      
      this.setWishedProducts()
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
 getProducts(){
    this._ProductsService.getProducts().subscribe({
      next: (response)=>{
        this.allProducts = response.data;
        this.getWishlist()
      },
      error:(error) => {console.log(error)}
    })
  }

  setWishedProducts(){
    for (let i = 0; i < this.wishList.data.length; i++) {
      for (let j = 0; j < this.allProducts.length; j++) {
        if (this.allProducts[j]._id == this.wishList.data[i]._id) {
          this.allProducts[j].isWished = true;
        }
      }      
    }
    
  }

  addToWishList(productId:string){

    this._wishlistService.addToWishlist(productId).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        this._wishlistService.wishlistCounter.next(res.data.length)
      this.getWishlist()
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }




  addToCart(product:Product){
  this._CartService.addToCart(product._id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this._CartService.cartCounter.next(res.numOfCartItems);
      this.toastr.success(product.title+' added to cart','',{
        progressBar:true
      });
    },
    error:(err)=>{this.toastr.error("error occured while adding to cart: "+err)}
  })
  }

  ngOnInit() {
   this.getProducts();
   
  }
}
