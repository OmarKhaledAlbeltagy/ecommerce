import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { wishList } from '../../core/interfaces/wishlist';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
private readonly _WishlistService = inject(WishlistService);
private readonly _CartService = inject(CartService);
private readonly toastr = inject(ToastrService);
isLoading:boolean = true;
wishList!:wishList;

getWishlist(){
  this._WishlistService.getWishlist().subscribe({
    next:(res)=>{
      console.log(res);
      this.wishList = res as wishList;
      this.isLoading = false;
    }
  })
}

addToCart(id:string, title:string){
  this.isLoading = true
this._CartService.addToCart(id).subscribe({
  next:(res)=>{
    this.isLoading = false
    this.toastr.success(title+' added to cart','',{
      progressBar:true
    });
  },
  error:(err)=>{this.toastr.error("error occured while adding to cart")}
})
}

ngOnInit(): void {
  this.getWishlist()
}
}
