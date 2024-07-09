import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CollabsService {

  private createCollabUrl = environment.createCollabUrl;
  private getCollabsUrl = environment.getCollabsUrl;
  private getCollabByIdUrl = environment.getCollabByIdUrl


  constructor(private http: HttpClient) { }

  getAllCollaborators(): Observable<any[]> {
    return this.http.get<any[]>(this.getCollabsUrl);
  }

  getCollaboratorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.getCollabByIdUrl}/${id}`);
  }

  createCollaborator(collaborator: any): Observable<any> {
    return this.http.post<any>(this.createCollabUrl, collaborator);
  }

  updateCollaborator(id: number, collaborator: any): Observable<any> {
    return this.http.put<any>(`${this.createCollabUrl}/${id}`, collaborator);
  }

  deleteCollaborator(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getCollabByIdUrl}/${id}`);
  }
}
