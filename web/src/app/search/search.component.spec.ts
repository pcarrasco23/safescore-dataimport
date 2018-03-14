import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { RestaurantDetailComponent } from '../restaurantdetail/restaurantdetail.component';
import { ErrorhandlerComponent } from '../utils/errorhandler/errorhandler.component';
import { RestaurantInspectionService } from '../services/restaurantinspection.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SearchComponent, 
        RestaurantDetailComponent, 
        ErrorhandlerComponent
      ],
      imports: [
        NgbModule,
        HttpClientModule
      ],
      providers: [RestaurantInspectionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
