import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/i-bookings';
import { ManageBookingsService } from './manage-bookings.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss'],
})
export class ManageBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  dates: string[] = [];
  showNoteInput: { [key: number]: boolean } = {};

  constructor(private bookingSvc: ManageBookingsService) {}

  ngOnInit(): void {
    this.bookingSvc.getBookings().subscribe((data) => {
      this.bookings = data;
      const dateSet = new Set<string>();

      for (let i = 0; i < this.bookings.length; i++) {
        dateSet.add(this.bookings[i].date);
      }

      this.dates = Array.from(dateSet);
      this.dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    });
  }

  delete(id: number): void {
    this.bookingSvc.delete(id).subscribe((response) => {
      this.bookings = this.bookings.filter((booking) => booking.id !== id);
    });
  }

  confirm(id: number): void {
    this.bookingSvc.confirm(id).subscribe(
      () => {
        const booking = this.bookings.find((b) => b.id === id);

        if (booking) {
          booking.confirmed = true;
        }
      },
      (error) => {
        console.error('Confirmation error:', error);
      }
    );
  }

  toggleNoteInput(id: number): void {
    this.showNoteInput[id] = !this.showNoteInput[id];
  }

  saveNote(id: number, note: string): void {
    this.bookingSvc.updateNote(id, note).subscribe(
      () => {
        const booking = this.bookings.find((b) => b.id === id);
        if (booking) {
          booking.note = note;
          this.showNoteInput[id] = false;
        }
      },
      (error) => {
        console.error('Update note error:', error);
      }
    );
  }
}
