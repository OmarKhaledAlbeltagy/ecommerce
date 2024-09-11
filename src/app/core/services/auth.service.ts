import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../enviroment/enviroment.development';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }

  signup = (data: any): Observable<any> => {
    return this._HttpClient.post(baseUrl+"api/v1/auth/signup", data);
  }

  signin = (data:any): Observable<any> => {
    return this._HttpClient.post(baseUrl+"api/v1/auth/signin", data)
  } 

  forgotPassword = (email: any): Observable<any> => {
    return this._HttpClient.post(baseUrl+"api/v1/auth/forgotPasswords", email);
  }

  verifyRestCode = (resetCode: any): Observable<any> => {
    return this._HttpClient.post(baseUrl+"api/v1/auth/verifyResetCode", resetCode);
  }

  resetPassword = (newPassword: any): Observable<any> => {
    return this._HttpClient.put(baseUrl+"api/v1/auth/resetPassword", newPassword);
  }

  saveUserData = () => {
    let token = localStorage.getItem('token')
    if (token) {
      try{
        jwtDecode(token)
      }
      catch (error){
        this._Router.navigate(['/signin']);
        localStorage.clear();
      }
    }
  }
}
