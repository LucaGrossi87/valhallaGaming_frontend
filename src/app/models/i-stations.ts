export interface Station {
  id?:number;
  available: boolean;
  bookingList: any[]; // Puoi specificare il tipo corretto se conosci la struttura degli oggetti nella lista
  stationType: string;
  seatsTotal: number;
}
