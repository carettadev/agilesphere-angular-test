import { Component, OnChanges, Input } from '@angular/core';
import { Summary } from '../../../model/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges {
  @Input() results: Summary[] = [];

  constructor() { }

  ngOnChanges() {
    // IMPLEMENT ANYTHING YOU BEKIEVE YOU MIGHT NEED HERE
  }
}


