import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DiscoverComponent } from './discover/discover.component';
import { SearchComponent } from './search/search.component';
import { RestaurantDetailComponent } from './restaurantdetail/restaurantdetail.component';
import { ErrorhandlerComponent } from './utils/errorhandler/errorhandler.component';
import { RestaurantInspectionService } from './services/restaurantinspection.service';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { constants } from './constants';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DiscoverComponent,
        SearchComponent,
        RestaurantDetailComponent,
        ErrorhandlerComponent
      ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: constants.googlemapsapi
        }),
        NgbModule.forRoot(),
        HttpClientModule
      ],
      providers: [RestaurantInspectionService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SafeScore');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('SafeScore');
  }));
});
