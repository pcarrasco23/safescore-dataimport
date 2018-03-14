import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Restaurant } from '../models/restaurant'
import { SearchRequest } from '../models/searchrequest'
import { SearchResponse } from '../models/searchresponse'
import { RestaurantMarker } from '../models/resturantmarker';
import { RESTAURANT } from '../mockdata/restaurant';
import { RESTAURANTMARKERS } from '../mockdata/restaurantmarkers';
import { SEARCHRESPONSE } from '../mockdata/searchresponse';
import { constants } from '../constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RestaurantInspectionService {

  url: string;
  useMockData: boolean = false;

  constructor(private http: HttpClient) { 
    this.url = constants.serviceurl;
  }

  getRestaurantInspections(id: number): Observable<Restaurant> {
    if (this.useMockData) {
      var data = new Observable<Restaurant>(observer => {
        setTimeout(() => {
            observer.next(RESTAURANT);
        }, 1000);
      });
      return data;
    }
    else {
      return this.http.get<Restaurant>(this.url + "nyc/restaurant/" + id);
    }
  }

  getRestaurantMarkersByCoordinates(lat: number, lng: number, range: number): Observable<RestaurantMarker[]> {
    if (this.useMockData) {
      var data = new Observable<RestaurantMarker[]>(observer => {
        setTimeout(() => {
            observer.next(RESTAURANTMARKERS);
        }, 1000);
      });
      return data;
    }
    else {
      var body = JSON.stringify( { latitude : lat, longitude: lng, range : range });
      var headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      return this.http.post<RestaurantMarker[]>(this.url + "nyc/restaurant/searchbygeocode", body, { headers });
    }
  }

  getCoordinatesFromZipcode(zipCode: string) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + constants.googlemapsapi);
  }

  searchRestaurants(name: string, zipCode: string, grade: string, page: number, pageSize: number): Observable<SearchResponse> {
    if (this.useMockData) {
      var data = new Observable<SearchResponse>(observer => {
        setTimeout(() => {
            observer.next(SEARCHRESPONSE);
        }, 1000);
      });
      return data;
    }
    else {
      var body = JSON.stringify( { name : name, zipCode : zipCode, grade : grade, page: page, pageSize: pageSize });
      var headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      return this.http.post<SearchResponse>(this.url + "nyc/restaurant/searchbyattribute", body, { headers });
    }
  }
}
