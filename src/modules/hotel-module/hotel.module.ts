import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AddUpdateHotelComponent } from './components/add-update-hotel/add-update-hotel.component';

@NgModule({
  declarations: [
    HotelListComponent,
    StarRatingComponent,
    AddUpdateHotelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'hotels', component: HotelListComponent },
      { path: 'hotels/edit/:id', component: AddUpdateHotelComponent },
      { path: 'hotels/add', component: AddUpdateHotelComponent }
    ])
  ]
})
export class HotelModule { }
