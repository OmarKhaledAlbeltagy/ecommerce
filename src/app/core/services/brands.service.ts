import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.development';
import { brand } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands(){
    return this._HttpClient.get(baseUrl+"api/v1/brands");
  }
  
}
