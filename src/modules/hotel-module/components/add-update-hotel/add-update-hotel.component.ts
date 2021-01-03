import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from '../../hotel.service';
import { Hotel } from '../../models/hotel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-update-hotel',
  templateUrl: './add-update-hotel.component.html',
  styleUrls: ['./add-update-hotel.component.css']
})

export class AddUpdateHotelComponent implements OnInit {
  hotel: Hotel;
  currentHotelName: string;
  errorMessages: string[] = [];
  successMessage: string;
  editMode: boolean;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.router.url.includes('add')) {
      this.editMode = false;
      this.hotel = new Hotel();
    } else {
      this.editMode = true;
      const parameterId = +this.route.snapshot.paramMap.get('id');
      this.getHotel(parameterId);
    }
  }

  getHotel(id: number): void {
    this.hotelService.getHotel(id).subscribe({
      next: hotel => {
        this.clearMessages();
        this.hotel = hotel;
        this.currentHotelName = hotel.name;
      },
      error: error => this.displayErrors(error)
    });
  }

  updateHotel(): void {
    this.hotelService.updateHotel(this.hotel).subscribe({
      next: hotel => {
        this.clearMessages();
        this.successMessage = 'Hotel został zaktualizowany';
        this.currentHotelName = hotel.name;
      },
      error: error => this.displayErrors(error)
    });
  }

  addHotel(): void {
    this.hotelService.addHotel(this.hotel).subscribe({
      next: () => {
        this.clearMessages();
        this.successMessage = 'Hotel został dodany';
        this.router.navigate(['/hotels']);
      },
      error: error => this.displayErrors(error)
    });
  }

  saveChanges(): void {
    if (this.editMode) {
      this.updateHotel();
    } else {
      this.addHotel();
    }
  }

  displayErrors(error: any): void {
    this.clearMessages();
    if (typeof error === 'object') {
      for (const err in error) {
        if (Array.isArray(error[err])) {
          this.errorMessages.push(...error[err]);
        }
      }
    } else if (typeof error === 'string') {
      this.errorMessages.push(error);
    }
  }

  clearMessages(): void {
    this.errorMessages = [];
    this.successMessage = '';
  }

}
