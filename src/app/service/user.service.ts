// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/i-users';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private createUsrUrl = environment.createUsrUrl;

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.createUsrUrl, user);
  }
}
