import { Station } from "./i-stations";
import { User } from "./i-users";

export interface Booking {
  id?: number;
  user: User;
  station: Station;
  date: string;
  open: boolean;
  confirmed: boolean;
  guests: number;
  seatsAvailable: number;
  game: string;
  note?: string;
}
