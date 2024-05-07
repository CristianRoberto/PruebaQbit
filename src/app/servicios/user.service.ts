import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url: any ='http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  getProductos(){
    return this.http.get(`${this.url}/producto`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  {headers:{'Content-Type':'application/json'}}).toPromise();
  }

  getProductosById(id: any) {
    return this.http.get(`${this.url}`+ `/producto/${id}`,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    {headers:{'Content-Type':'application/json'}}).toPromise();
  }

  postuser(users: any){
    return this.http.post(`${this.url}`+ `/producto`, users,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  {headers:{'Content-Type':'application/json'}}).toPromise();
  }

}
