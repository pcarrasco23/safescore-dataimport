import { Component, OnInit, Input } from '@angular/core';
import { AnonymousSubject } from 'rxjs/Subject';

@Component({
  selector: 'app-errorhandler',
  templateUrl: './errorhandler.component.html',
  styleUrls: ['./errorhandler.component.css']
})
export class ErrorhandlerComponent implements OnInit {

  @Input() error: any;

  constructor() { }

  ngOnInit() {
  }

}
