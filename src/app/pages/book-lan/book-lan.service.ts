import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../../models/i-stations';

@Injectable({
  providedIn: 'root',
})
export class BookLanService {
  private newLansUrl = environment.newLansUrl;
  private lanBookingUrl = environment.lanBookingUrl; // Assicurati che questo sia definito nel tuo environment.ts

  constructor(private http: HttpClient) {}

  getLans(date: string): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.newLansUrl}?date=${date}`);
  }

  lanBooking(date: string, userId: number): Observable<any> {
    const params = new HttpParams()
      .set('date', date)
      .set('userId', userId.toString());

    return this.http.post(`${this.lanBookingUrl}`, params);
  }
}
