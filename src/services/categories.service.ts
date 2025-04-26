import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _Httpclient=inject(HttpClient)
// dependency injection and take copy of httpclient
// -------------
// method to connect with api
  getAllCategories():Observable<any>{
 return this._Httpclient.get<any>(`${environment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategories(id:string):Observable<any>{
 return this._Httpclient.get<any>(`${environment.baseUrl}/api/v1/categories/${id}`)
  }
}
