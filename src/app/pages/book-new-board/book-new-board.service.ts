import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../../models/i-stations';
import { Booking } from '../../models/i-bookings';

@Injectable({
  providedIn: 'root',
})
export class BookNewBoardService {
  private newBoardsUrl = environment.newBoardsUrl;
  private newBoardsBookingUrl = environment.newBoardsBookingUrl;
  private bookingById = environment.bookingsById;
  private boardsBySeats = environment.boardsBySeats;

  constructor(private http: HttpClient) {}

  getNewBoards(date: string): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.newBoardsUrl}?date=${date}`);
  }

  getNewBoardById(date: string, seats: number): Observable<Station[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('seats', seats.toString());

    return this.http.get<Station[]>(this.boardsBySeats, { params });
  }

  newBoardBooking(
    date: string,
    guests: number,
    userId: number,
    open: boolean,
    game: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('date', date)
      .set('userId', userId.toString())
      .set('guests', guests)
      .set('game', game)
      .set('open', open);

    return this.http.post(`${this.newBoardsBookingUrl}`, params);
  }

  newBoardBookingById(
    date: string,
    guests: number,
    userId: number,
    open: boolean,
    boardId: number,
    game: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('date', date)
      .set('userId', userId.toString())
      .set('guests', guests)
      .set('boardId', boardId)
      .set('game', game)
      .set('open', open);

    return this.http.post(`${this.bookingById}`, params);
  }
}
