import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _HttpClient:HttpClient) {
    
  }
  

  createCheckoutSession(cartId:string, shippingAddress:any) {
    return this._HttpClient.post(baseUrl + "api/v1/orders/checkout-session/"+cartId+"?url="+"http://localhost:4200",
      { shippingAddress },
      { headers: { token: localStorage.getItem('token')! } })
  }


}
