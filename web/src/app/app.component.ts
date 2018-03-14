import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SafeScore';

  appMode = false;
  discoverMode = true;
  searchMode = false;

  showDiscover() {
    this.discoverMode = true;
    this.searchMode = false;
  }

  showSearch() {
    this.searchMode = true;
    this.discoverMode = false;
  }

  showApp() {
    this.appMode = true;
  }

  hideApp() {
    this.appMode = false;
  }

}
