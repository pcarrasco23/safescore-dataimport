import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { RestaurantDetailComponent } from './restaurantdetail/restaurantdetail.component';
import { RestaurantInspectionService } from './services/restaurantinspection.service';
import { DiscoverComponent } from './discover/discover.component';
import { ErrorhandlerComponent } from './utils/errorhandler/errorhandler.component';
import { constants } from './constants';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RestaurantDetailComponent,
    DiscoverComponent,
    ErrorhandlerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: constants.googlemapsapi
    }),
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [RestaurantInspectionService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
