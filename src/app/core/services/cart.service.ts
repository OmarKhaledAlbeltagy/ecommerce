import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }

  getCart() {
    return this._HttpClient.get(baseUrl + "api/v1/cart", { headers: { token: localStorage.getItem('token')! } })
  }

  addToCart(productId: string) {
   return this._HttpClient.post(baseUrl + "api/v1/cart", { productId: productId }, {headers: { token: localStorage.getItem('token')! }})
  }

  updateCartQuantity(productId: string, count: number) {
    return this._HttpClient.put(baseUrl + "api/v1/cart/" + productId, { count: count }, { headers: { token: localStorage.getItem('token')! } })
  }

  removeItemFromCart(productId:string){
    return this._HttpClient.delete(baseUrl+"api/v1/cart/"+productId,{headers:{token:localStorage.getItem('token')!}})
  }

  clearCart(){
    return this._HttpClient.delete(baseUrl+"api/v1/cart/",{headers:{token:localStorage.getItem('token')!}})
  }
}
