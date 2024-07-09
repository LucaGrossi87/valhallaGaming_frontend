import { Booking } from './../../../models/i-bookings';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageBookingsService {
  private bookingsUrl = environment.bookingsUrl;
  private deleteBookingUrl = environment.deleteBookingUrl;
  private bookingsByStationUrl = environment.bookingsByStationUrl;

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl);
  }

  delete(id: number): Observable<Booking> {
    return this.http.delete<Booking>(`${this.deleteBookingUrl}/${id}`);
  }

  confirm(id: number): Observable<void> {
    return this.http.put<void>(`${this.bookingsUrl}/${id}/confirmation`, {});
  }
  deleteEmail(id: number): Observable<void> {
    return this.http.put<void>(`${this.bookingsUrl}/${id}/delete`, {});
  }

  updateNote(id: number, note: string): Observable<void> {
    return this.http.put<void>(`${this.bookingsUrl}/${id}/note`, note);
  }

  getBookingsByStationId(stationId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.bookingsByStationUrl}/${stationId}`
    );
  }
}
