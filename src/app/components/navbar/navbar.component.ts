import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly _Router = inject(Router)
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  cartCounter:number = 0;
  wishlistCounter:number = 0;


  signout(){
    localStorage.removeItem('token');
    this._Router.navigate(['/signin']);
  }

  getCart(){
    this._CartService.getCart().subscribe({
      next:(res:any)=>{
        this._CartService.cartCounter.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getWishlist(){
    this._WishlistService.getWishlist().subscribe({
      next:(res:any)=>{
        this._WishlistService.wishlistCounter.next(res.count)
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  ngOnInit(){
    this.getCart()
    this.getWishlist()
    this._CartService.cartCounter.subscribe({
      next:(counter)=>{
        this.cartCounter = counter;
      }
    });
    this._WishlistService.wishlistCounter.subscribe({
      next:(counter)=>{
        this.wishlistCounter = counter;
      }
    })
  }

}
