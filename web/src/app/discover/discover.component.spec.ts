import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { RestaurantDetailComponent } from '../restaurantdetail/restaurantdetail.component';
import { ErrorhandlerComponent } from '../utils/errorhandler/errorhandler.component';
import { RestaurantInspectionService } from '../services/restaurantinspection.service';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DiscoverComponent, 
        RestaurantDetailComponent, 
        ErrorhandlerComponent
      ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyB00vqrTiTlQMGedZBawWl_yLzA5BSbPPs'
        }),
        NgbModule,
        HttpClientModule
      ],
      providers: [RestaurantInspectionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
