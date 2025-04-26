import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _Httpclient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData: any = null;

  setRegisterForm(data: object): Observable<any> {
    return this._Httpclient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  setLoginForm(data: object): Observable<any> {
    return this._Httpclient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  signOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this._Httpclient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  setCodeVerify(data: object): Observable<any> {
    return this._Httpclient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  setResetPass(data: object): Observable<any> {
    return this._Httpclient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }
}
