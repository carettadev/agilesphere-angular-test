import { Component, OnChanges, Input } from '@angular/core';
import { Summary } from '../../../model/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges {
  @Input() results: Summary[] = [];
  times: string[];

  constructor() { }

  ngOnChanges() {
    // constructing the times for the table column headers
    const keys = Object.keys(this.results);
    this.times = keys.length > 0 ? this.results[keys[0]].times : [];
  }
}


