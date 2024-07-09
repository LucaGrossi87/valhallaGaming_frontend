// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/i-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://tasty-lavinie-lucagrossi87-8ac74254.koyeb.app/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
