import { Component, OnInit } from '@angular/core';
import { BookNewBoardService } from './book-new-board.service';
import { DateService } from '../../service/date.service';
import { UserService } from '../../service/user.service';
import { User } from '../../models/i-users';
import { Station } from '../../models/i-stations';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-new-board',
  templateUrl: './book-new-board.component.html',
  styleUrls: ['./book-new-board.component.scss'],
})
export class BookNewBoardComponent implements OnInit {
  boards: Station[] = [];
  settedBoards: Station[] = [];
  date: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  guests: number = 0;
  open: boolean = false;
  guestNumbers: number[] = [];
  seats: number = 0;
  boardId: number | undefined;
  chosenBoard: Station | undefined;
  game: string = '';
  maxSeats: number = 0;
  showAlert: boolean = false;

  constructor(
    private newBoardSvc: BookNewBoardService,
    private dateSvc: DateService,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.date = this.dateSvc.getSelectedDate();
    if (!this.date) {
      return;
    }

    this.newBoardSvc.getNewBoards(this.date).subscribe((data) => {
      this.boards = data;

      this.boards.sort((a, b) => {
        if (a.seatsTotal < b.seatsTotal) {
          return -1;
        }
        if (a.seatsTotal > b.seatsTotal) {
          return 1;
        }
        return 0;
      });

      this.settedBoards = this.boards.filter(
        (board, index, self) =>
          index === self.findIndex((t) => t.seatsTotal === board.seatsTotal)
      );

      for (let i = 0; i < this.boards.length; i++) {
        const b = this.boards[i];

        if (b.seatsTotal > this.maxSeats) {
          this.maxSeats = b.seatsTotal;
        }
      }

      for (let i = 2; i <= this.maxSeats; i++) {
        this.guestNumbers.push(i);
      }
    });
  }

  onSeatSelected(board: Station): void {
    this.seats = board.seatsTotal;
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
      !this.guests ||
      !this.seats ||
      !isValidEmail(this.email)
    ) {
      this.showAlert = true;
    }
    if (this.firstName && this.lastName && this.email && this.game) {
      const newUser: User = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      };

      let userIdToUse: number | undefined;

      this.userSvc
        .createUser(newUser)
        .pipe(
          switchMap((user) => {
            if (user.id !== undefined) {
              userIdToUse = user.id;
              if (!this.open) {
                return this.newBoardSvc
                  .newBoardBooking(
                    this.date,
                    this.guests,
                    userIdToUse,
                    this.open,
                    this.game
                  )
                  .pipe(
                    catchError((error) => {
                      console.error('Errore durante la prenotazione:', error);
                      return throwError(
                        'Impossibile effettuare la prenotazione. Riprova più tardi.'
                      );
                    })
                  );
              } else {
                return this.newBoardSvc
                  .getNewBoardById(this.date, this.seats)
                  .pipe(
                    switchMap((boards) => {
                      if (boards.length > 0) {
                        this.chosenBoard = boards[0];
                        this.boardId = this.chosenBoard.id;

                        return this.newBoardSvc
                          .newBoardBookingById(
                            this.date,
                            this.guests,
                            userIdToUse || 0,
                            this.open,
                            this.boardId || 0,
                            this.game
                          )
                          .pipe(
                            catchError((error) => {
                              console.error(
                                'Errore durante la prenotazione:',
                                error
                              );
                              return throwError(
                                'Impossibile effettuare la prenotazione. Riprova più tardi.'
                              );
                            })
                          );
                      } else {
                        console.log(
                          'Nessun board disponibile trovato per i criteri specificati'
                        );
                        return throwError(
                          'Nessun board disponibile trovato per i criteri specificati'
                        );
                      }
                    }),
                    catchError((error) => {
                      console.error(
                        'Errore durante il recupero dei tavoli:',
                        error
                      );
                      return throwError(
                        'Impossibile recuperare i tavoli disponibili. Riprova più tardi.'
                      );
                    })
                  );
              }
            } else {
              console.error(
                "Errore nella creazione dell'utente: ID non definito"
              );
              return throwError(
                "Errore nella creazione dell'utente: ID non definito"
              );
            }
          }),
          catchError((error) => {
            console.error("Errore durante la creazione dell'utente:", error);
            return throwError(
              "Impossibile creare l'utente. Riprova più tardi."
            );
          })
        )
        .subscribe(
          () => {
            this.router.navigate(['/wait-confirmation']);
            console.log(
              `Prenotazione effettuata per ${this.firstName} ${this.lastName} alla data ${this.date}`
            );
          },
          (error) => {
            console.error('Errore durante la prenotazione:', error);
          }
        );
    } else {
      console.log('Inserisci nome, cognome, email e gioco per prenotare');
    }
  }
}
