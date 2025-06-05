import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      // Fields name should match with the formControlName valud of .HTML file.
      id:[''],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      // User multiple validations you need to use array of Validators
      fullName: ['', [Validators.required, Validators.max(50)]],
      email: ['', [Validators.required, Validators.email]],
      roomNo: ['', Validators.required]
    })

    // For editing form and filling the values
    let currentId = this.activeRoute.snapshot.paramMap.get('id');
    if (currentId) {
      this.reservationService.getReservation(currentId)?.subscribe(reservation => {
        if(reservation)
          // use patchValue method to fill the form values
          this.reservationForm.patchValue(reservation);
      });
    }
  }

  OnBookSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      // Get current id value from the URL
      let currentId = this.activeRoute.snapshot.paramMap.get('id');

      if (currentId) {
        // Update an existing entry
        // reservation.id = currentId; // set same id to updated reservation as in form its not set
        this.reservationService.updateReservation(currentId, reservation).subscribe(
          () => alert("Record is Updated.!")            
        );
      } else {
        // Add new entry
        this.reservationService.addReservation(reservation).subscribe(
          () => alert("Record is Inserted.!")
        );
      }

      // Navigate to the reservation-list page.
      this.router.navigate(['list']);
    }
  }

  deleteReservation(resId: string) {
    this.reservationService.deleteReservation(resId);
  }

}
