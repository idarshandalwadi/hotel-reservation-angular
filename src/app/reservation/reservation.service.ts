import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // Static CURD operation with Reservation[]
  private reservations: Reservation[] = [];
  private apiUrl = "http://localhost:3000";

  // constructor() {
  //   let storedReservations = localStorage.getItem("reservations");
  //   this.reservations = storedReservations ? JSON.parse(storedReservations) : [];
  // }

  constructor(private httpclient: HttpClient) { }

  // When u use httpAPI u need to use Observable as return type
  getAllReservations(): Observable<Reservation[]> {
    return this.httpclient.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Observable<Reservation> | undefined {
    return this.httpclient.get<Reservation>(this.apiUrl + "/reservation/" + id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.httpclient.post<void>(this.apiUrl + "/reservation", reservation);
    // reservation.id = Date.now().toString();
    // this.reservations.push(reservation);
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(currentId: string, updatedRes: Reservation): Observable<void> {
    return this.httpclient.put<void>(this.apiUrl + "/reservation/" + currentId, updatedRes);
    // let index = this.reservations.findIndex(res => res.id === currentId);
    // this.reservations[index] = updatedRes;
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): Observable<void> {
    return this.httpclient.delete<void>(this.apiUrl + "/reservation/" + id);
    // let index = this.reservations.findIndex(res => res.id === id);
    // this.reservations.splice(index, 1);
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

}
