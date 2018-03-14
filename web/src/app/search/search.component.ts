import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../models/searchrequest'
import { SearchResponse } from '../models/searchresponse'
import { SearchResponseItem } from '../models/searchresponseitem'
import { RestaurantInspectionService } from '../services/restaurantinspection.service'
import { Restaurant } from '../models/restaurant';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  selectedRestaurant: Restaurant;
  searchResponse: SearchResponse;
  pageSize = 10;
  name: string;
  zipCode: string;
  grade: string = "";
  page: number = 1;
  error: any;

  constructor(private restaurantInspectionService: RestaurantInspectionService) { }

  ngOnInit() { }

  onSelect(item: SearchResponseItem) : void {
    this.restaurantInspectionService.getRestaurantInspections(item.id)
      .subscribe(data => { this.selectedRestaurant = data },
        error => { this.error = error; },
        () => { this.error = null; console.log(this.selectedRestaurant); });
  }

  onNameKey(value: string) {
    this.name = value;
  }

  onZipcodeKey(value: string) {
    this.zipCode = value;
  }

  onGradeChanged(value: string) {
    this.grade = value;
  }

  submitSearch(): void {
    this.restaurantInspectionService.searchRestaurants(this.name, this.zipCode, this.grade, this.page, this.pageSize)
      .subscribe(data => { this.searchResponse = data }, 
        error => { this.error = error; },
        () => { this.error = null; });
  }
}
