import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistCounter:BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient) { }

  getWishlist(){
    return  this._HttpClient.get(baseUrl+"api/v1/wishlist",{headers:{token: localStorage.getItem('token')!}});
  }

  addToWishlist(productId:string){
    return this._HttpClient.post(baseUrl+"api/v1/wishlist",{productId},{headers:{token: localStorage.getItem('token')!}});
  }

  removeFromWishlist(productId:string){
    return this._HttpClient.delete(baseUrl+"api/v1/wishlist/"+productId,{headers:{token: localStorage.getItem('token')!}});
  }
}
