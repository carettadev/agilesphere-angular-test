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
    // constructing the times for the table columns
    const keys = Object.keys(this.results);
    if (keys.length > 0) {
      this.times = this.results[keys[0]].times;
    }
  }

  formatTime(date: Date): string {
    // formats a  Date object into a 12h AM/PM time string
    let hour = date.getHours();
    var amPM = (hour > 11) ? "PM" : "AM";
    if(hour > 12) {
      hour -= 12;
    } else if(hour == 0) {
      hour = 12;
    }
    return hour + "" + amPM;
  }
}


