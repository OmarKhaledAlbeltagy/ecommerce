import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  getWishlist(){
    return  this._HttpClient.get(baseUrl+"api/v1/wishlist",{headers:{token: localStorage.getItem('token')!}});
  }
}
