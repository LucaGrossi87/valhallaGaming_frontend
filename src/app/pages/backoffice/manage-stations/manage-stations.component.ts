import { Component, OnInit } from '@angular/core';
import { Station } from '../../../models/i-stations';
import { ManageStationsService } from './manage-stations.service';
import { ManageBookingsService } from '../manage-bookings/manage-bookings.service'; // Importa il servizio di gestione prenotazioni

@Component({
  selector: 'app-manage-stations',
  templateUrl: './manage-stations.component.html',
  styleUrls: ['./manage-stations.component.scss'],
})
export class ManageStationsComponent implements OnInit {
  boards: Station[] = [];
  lans: Station[] = [];
  editId: number | null = null;
  editSeatsTotal: number | null = null;
  editStationType: string | null = null;
  postSeatsTotal: number = 0;
  select: boolean = false;
  seatsSelection: number[] = [2, 3, 4, 5, 6, 7, 8, 10, 11, 12];

  constructor(
    private stationSvc: ManageStationsService,
    private bookingsSvc: ManageBookingsService // Inietta il servizio di gestione prenotazioni
  ) {}

  ngOnInit(): void {
    this.stationSvc.getBoards().subscribe((data) => {
      this.boards = data.sort((a, b) => a.id! - b.id!);
    });
    this.stationSvc.getLans().subscribe((data) => {
      this.lans = data.sort((a, b) => a.id! - b.id!);
    });
  }

  delete(id: number): void {
    let deletedBookingIds: number[] = [];

    this.stationSvc.delete(id).subscribe(() => {
      this.boards = this.boards.filter((board) => board.id !== id);
      this.lans = this.lans.filter((lan) => lan.id !== id);

      this.bookingsSvc.getBookingsByStationId(id).subscribe((bookings) => {
        deletedBookingIds = bookings.map((booking) => booking.id!);

        deletedBookingIds.forEach((bookingId) => {
          this.bookingsSvc.deleteEmail(bookingId).subscribe(
            () => {
              console.log(
                `Email di cancellazione inviata per la prenotazione ${bookingId}`
              );
            },
            (error) => {
              console.error(
                `Errore durante l'invio dell'email di cancellazione per la prenotazione ${bookingId}:`,
                error
              );
            }
          );
        });
      });
    });
  }

  edit(station: Station): void {
    this.editId = station.id || null;
    this.editSeatsTotal = station.seatsTotal;
    this.editStationType = station.stationType;
  }

  isEditing(station: Station): boolean {
    return this.editId === station.id;
  }

  submitEdit(): void {
    if (
      this.editSeatsTotal !== null &&
      this.editId !== null &&
      this.editStationType !== null
    ) {
      const updatedStation: Partial<Station> = {
        seatsTotal: this.editSeatsTotal,
        stationType: this.editStationType,
      };
      this.stationSvc
        .update(this.editId, updatedStation)
        .subscribe((updatedData) => {
          const boardIndex = this.boards.findIndex(
            (board) => board.id === this.editId
          );
          if (boardIndex !== -1) {
            this.boards[boardIndex] = updatedData;
          } else {
            const lanIndex = this.lans.findIndex(
              (lan) => lan.id === this.editId
            );
            if (lanIndex !== -1) {
              this.lans[lanIndex] = updatedData;
            }
          }
          this.editId = null;
        });
    }
  }

  postStation(type: string): void {
    if (type == 'LAN') {
      const postStation: Partial<Station> = {
        stationType: type,
        seatsTotal: 1,
      };
      this.stationSvc.post(postStation).subscribe((data) => {
        this.lans.push(data);
      });
    } else if (type == 'BOARD') {
      const postStation: Partial<Station> = {
        stationType: type,
        seatsTotal: this.postSeatsTotal,
      };
      this.stationSvc.post(postStation).subscribe((data) => {
        this.boards.push(data);
      });
    }
  }

  toggleSelect(): void {
    this.select = !this.select;
  }
}
