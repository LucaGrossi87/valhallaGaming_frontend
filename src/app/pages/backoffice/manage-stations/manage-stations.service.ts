import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../../../models/i-stations';

@Injectable({
  providedIn: 'root',
})
export class ManageStationsService {
  private boardsUrl = environment.boardsUrl;
  private lansUrl = environment.lansUrl;
  private deleteStationUrl = environment.deleteStationUrl;
  private postStationUrl = environment.postStationUrl;
  private updateBoardUrl = environment.updateBoardUrl;

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Station[]> {
    return this.http.get<Station[]>(this.boardsUrl);
  }
  getLans(): Observable<Station[]> {
    return this.http.get<Station[]>(this.lansUrl);
  }

  delete(id: number): Observable<Station> {
    return this.http.delete<Station>(`${this.deleteStationUrl}/${id}`);
  }

  update(id: number, data: Partial<Station>): Observable<Station> {
    return this.http.put<Station>(`${this.updateBoardUrl}/${id}`, data);
  }

  post(station: Partial<Station>): Observable<Station> {
    return this.http.post<Station>(this.postStationUrl, station);
  }
}
