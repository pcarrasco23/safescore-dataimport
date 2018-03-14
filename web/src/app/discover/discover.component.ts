import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestaurantInspectionService } from '../services/restaurantinspection.service'
import { Restaurant } from '../models/restaurant'
import { RestaurantMarker } from '../models/resturantmarker';
import { MapTypeStyle, LatLngBounds, LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  // Default coordinates whne loading the map
  defaultLat: number = 40.7631482;
  defaultLng: number = -73.9770626;
  defaultZoom: number = 18;

  // Defult map properties
  clickableIcons: boolean = false;
  streetViewControl: boolean = false;
  mapTypeStyle: MapTypeStyle[];
  
  lat: number = this.defaultLat;
  lng: number = this.defaultLng;
  zoom: number = this.defaultZoom;
  radius: number = 0.0020;
  currentLat: number = this.defaultLat;
  currentLng: number = this.defaultLng;
  currentRadius: number = this.radius;
  selectedRestaurant: Restaurant;
  error: any;

  markers: RestaurantMarker[];
  zipCode: string;

  constructor(private restaurantInspectionService: RestaurantInspectionService) { }

  ngOnInit() {
    // Hide point of interests on the map
    this.mapTypeStyle = [
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ];
  }

  onSelectMarker(marker: RestaurantMarker) {
    this.restaurantInspectionService.getRestaurantInspections(marker.id)
      .subscribe(data => { this.selectedRestaurant = data },
        error => { this.error = error; },
        () => { this.error = null; });
  }

  onZipCodeKey(value: string) {
    this.zipCode = value;
  }

  onGoToZipcode() {
    var response;
    this.restaurantInspectionService.getCoordinatesFromZipcode(this.zipCode)
      .subscribe(data => { response = data },
      error => {console.log(error)},
      () => {
        if (response && response["status"] == "OK") {
          this.lat = response.results[0]["geometry"]["location"]["lat"];
          this.lng = response.results[0]["geometry"]["location"]["lng"];
        }
      });
  }

  onFindNearby() {
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      self.lat = position.coords.latitude;
      self.lng = position.coords.longitude;

      self.currentLat = self.lat;
      self.currentLng = self.lng;
    });
  }

  onBoundsChanged(latLngBounds: LatLngBounds) {
    // Capture the lat, lng, and radius of the current state of the map
    var nwBounds = latLngBounds.getNorthEast();
    var seBounds = latLngBounds.getSouthWest();

    this.currentLat = (nwBounds.lat() + seBounds.lat()) / 2;
    this.currentLng = (nwBounds.lng() + seBounds.lng()) / 2;

    this.currentRadius = Math.max((nwBounds.lat() - seBounds.lat()), (nwBounds.lng() - seBounds.lng()));

    // Do not return too many results. Limit the search radius to 0.01
    if (this.currentRadius > 0.01)
      this.currentRadius = 0.01;
  }

  onIdle() {
    // Once the user has finished dragging or zooming use the current coordinates to query the service
    this.restaurantInspectionService.getRestaurantMarkersByCoordinates(this.currentLat, this.currentLng, this.currentRadius)
      .subscribe(data => { this.markers = data }, 
        error => { this.error = error; },
        () => { 
          this.error = null;
          this.updateIconUrlAttribute(this.markers);
        });
  }

  updateIconUrlAttribute(markers: RestaurantMarker[]) {
    markers.forEach(element => {
      if (element.grade == 'A')
        element.iconUrl = '/assets/images/a_marker.png';
      else if (element.grade == 'B')
        element.iconUrl = '/assets/images/b_marker.png';
      else if (element.grade == 'C')
        element.iconUrl = '/assets/images/c_marker.png';
      else if (element.closed)
        element.iconUrl = '/assets/images/closed_marker.png'
      else element.iconUrl = 'assets/images/ng_marker.png';
    });
  }
}
