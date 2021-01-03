import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../hotel.service';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})

export class HotelListComponent implements OnInit {
  hotels: Hotel[];
  errorMessage: string;
  successMessage: any;

  constructor(
    private hotelService: HotelService
  ) { }

  ngOnInit() {
    this.getHotels();
  }

  getHotels(): void {
    this.hotelService.getHotelList().subscribe({
      next: hotels => this.hotels = hotels,
      error: error => this.errorMessage = error
    });
  }

  deleteHotel(id: number): void {
    this.hotelService.deleteHotel(id).subscribe({
      next: result => this.successMessage = result,
      error: error => {
        if (error.includes('Usunięto hotel o identyfikatorze')) {
          let index = this.hotels.indexOf(this.hotels.find(x => x.id == id));
          this.hotels.splice(index, 1);
          this.successMessage = error;
        } else {
          this.errorMessage = error;
        }
      }
    });
  }

}
