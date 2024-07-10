// book-open-board.component.ts

import { BookNewBoardService } from './../book-new-board/book-new-board.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/i-bookings';
import { BookOpenBoardService } from './book-open-board.service';
import { DateService } from '../../service/date.service';
import { User } from '../../models/i-users';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-open-board',
  templateUrl: './book-open-board.component.html',
  styleUrls: ['./book-open-board.component.scss'],
})
export class BookOpenBoardComponent implements OnInit {
  boards: Booking[] = [];
  bookings: Booking[] = [];
  date: string = '';
  hasAvailableBookings: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  chosenBooking: Booking | undefined;
  showBookingForm: boolean = false;
  showAlert: boolean = false;

  constructor(
    private router: Router,
    private openBoardSvc: BookOpenBoardService,
    private dateSvc: DateService,
    private newBoardSvc: BookNewBoardService,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    this.date = this.dateSvc.getSelectedDate();
    if (!this.date) {
      console.log('Data non selezionata');
      return;
    }

    this.openBoardSvc.getOpenBoards(this.date).subscribe((data) => {
      this.boards = data;
      this.hasAvailableBookings =
        this.boards.length > 0 &&
        this.boards.some((board) => board.seatsAvailable > 0);
    });

    this.openBoardSvc.bookingsByDate(this.date).subscribe((data) => {
      this.bookings = data;
    });
  }

  showForm(booking: Booking): void {
    this.chosenBooking = booking;
    this.showBookingForm = true;
  }

  prenota(): void {
    const isValidEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !isValidEmail(this.email)
    ) {
      this.showAlert = true;
    }
    const newUser: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };

    this.userSvc.createUser(newUser).subscribe((user) => {
      if (user.id !== undefined) {
        this.newBoardSvc
          .newBoardBookingById(
            this.date,
            1,
            user.id,
            false,
            this.chosenBooking?.station.id!,
            this.chosenBooking?.game!
          )
          .subscribe(() => {
            console.log(
              `Prenotazione effettuata per ${this.firstName} ${this.lastName} alla data ${this.date}`
            );
            if (this.chosenBooking) {
              this.chosenBooking.seatsAvailable -= 1;
              this.openBoardSvc
                .editBooking(this.chosenBooking.id!, this.chosenBooking)
                .subscribe(() => {
                  console.log('Posti disponibili aggiornati con successo');
                  this.showBookingForm = false;
                  this.router.navigate(['/wait-confirmation']);
                });
            }
          });
      }
    });
  }
}
