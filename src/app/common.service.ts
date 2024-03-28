import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  readonly url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  AddUpdateUser(Users: any): Observable<any> {
    return this.http.post(this.url + 'Users', Users);
  }
  GetAllUsers(): Observable<any> {
    return this.http.get(this.url + 'Users');
  }
  GetUserByID(id: any): Observable<any> {
    return this.http.get(this.url + 'Users/' + id);
  }
  DeleteUserByID(id: any): Observable<any> {
    return this.http.delete(this.url + 'Users/' + id);
  }
}
