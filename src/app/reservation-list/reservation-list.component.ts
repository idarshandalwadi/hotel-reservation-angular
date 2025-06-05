import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})

export class ReservationListComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }

  reservations: Reservation[] = [];

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(allRes => {
      this.reservations = allRes;
    });
  }

  deleteReservation(resId: string) {
    this.reservationService.deleteReservation(resId).subscribe(()=>{
      alert("Record Deleted.!");
    });
  }

}
