import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import { RestaurantInspectionService } from './restaurantinspection.service';

describe('RestaurantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RestaurantInspectionService]
    });
  });

  it('should be created', inject([RestaurantInspectionService], (service: RestaurantInspectionService) => {
    expect(service).toBeTruthy();
  }));
});
