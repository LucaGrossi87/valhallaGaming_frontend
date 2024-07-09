import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private selectedDateKey = 'selectedDate';

  setSelectedDate(date: string): void {
    localStorage.setItem(this.selectedDateKey, date);
  }

  getSelectedDate(): string {
    return localStorage.getItem(this.selectedDateKey) || '';
  }

  clearSelectedDate(): void {
    localStorage.removeItem(this.selectedDateKey);
  }
}
