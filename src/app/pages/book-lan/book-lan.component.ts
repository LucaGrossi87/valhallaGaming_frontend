import { User } from './../../models/i-users';
import { Component, OnInit } from '@angular/core';
import { BookLanService } from './book-lan.service';
import { Station } from '../../models/i-stations';
import { DateService } from '../../service/date.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-lan',
  templateUrl: './book-lan.component.html',
  styleUrls: ['./book-lan.component.scss'],
})
export class BookLanComponent implements OnInit {
  lans: Station[] = [];
  date: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = 'email';
  showAlert: boolean = false;
  showAlertEmail: boolean = false;

  constructor(
    private lansSvc: BookLanService,
    private dateSvc: DateService,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.date = this.dateSvc.getSelectedDate();
    if (!this.date) {
      console.log('Data non selezionata');
      return;
    }

    this.lansSvc.getLans(this.date).subscribe((data) => {
      this.lans = data;
    });
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

    if (this.firstName && this.lastName && this.email) {
      const newUser: User = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      };

      this.userSvc.createUser(newUser).subscribe((user) => {
        if (user.id !== undefined) {
          this.lansSvc.lanBooking(this.date, user.id).subscribe(() => {
            console.log(
              `Prenotazione effettuata per ${this.firstName} ${this.lastName} alla data ${this.date}`
            );
            this.router.navigate(['/wait-confirmation']);
          });
        } else {
          console.log("Errore nella creazione dell'utente: ID non definito");
        }
      });
    } else {
      console.log('Inserisci nome, cognome e email per prenotare');
    }
  }
}
