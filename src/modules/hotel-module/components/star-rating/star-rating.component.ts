import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  starWidth: number;

  constructor() { }

  ngOnInit() {
    this.displayStarRating();
  }

  displayStarRating(): void {
    this.starWidth = this.rating * 75 / 5;
  }

}
