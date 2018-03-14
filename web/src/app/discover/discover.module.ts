import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB00vqrTiTlQMGedZBawWl_yLzA5BSbPPs'
    })
  ],
})

export class DiscoverModule { }
