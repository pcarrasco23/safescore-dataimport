import { Component, OnInit, Input } from '@angular/core';
import { Inspection, Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-restaurantdetail',
  templateUrl: './restaurantdetail.component.html',
  styleUrls: ['./restaurantdetail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  @Input() restaurant: Restaurant;

  selectedInspections: Inspection[]; 
  index: number;

  constructor() { 
    this.selectedInspections = new Array<Inspection>();
  }

  ngOnInit() { }

  toggleShowViolations(inspection: Inspection) {
    this.index = this.selectedInspections.indexOf(inspection); 
    if (this.index >= 0)
      this.selectedInspections.splice(this.index, 1);
    else
      this.selectedInspections.push(inspection);
  }
}
