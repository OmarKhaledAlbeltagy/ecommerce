import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { cart } from '../../core/interfaces/cart';
import { STRING_TYPE } from '@angular/compiler';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  private readonly toastr = inject(ToastrService)
  cart!:cart;

  isLoading = true;
    
  getCart(){
    this._CartService.getCart().subscribe({
      next:(res)=>{
        this.cart = res as cart;
        console.log(res);
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }
  updateCartQuantity(productId:string, count:number){
    this.isLoading = true;
    this._CartService.updateCartQuantity(productId,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cart = res as cart;
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  removeItemFromCart(productId:string){
    this.isLoading = true;
    this._CartService.removeItemFromCart(productId).subscribe({
      next: (res:any)=>{
        console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems)
        this.cart = res as cart;
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
    }

    clearCart(){
      this.isLoading = true;
      this._CartService.clearCart().subscribe({
        next:(res)=>{
          this.getCart()
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
        }
      })
    }
  

  ngOnInit(){
  
    this.getCart()
    
    
  }
}
