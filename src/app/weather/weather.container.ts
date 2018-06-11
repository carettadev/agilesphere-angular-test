import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Store } from '@ngrx/store';
import * as weather from './store';
import { Summary } from '../model/weather';
import { weatherReducer } from './store/reducers/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (searched)="citySearch($event)"></app-search>
  <app-results [results]="weatherResults"></app-results>  `
})
export class WeatherContainer implements OnInit {
  weatherResults = [];

  constructor(private weatherService: WeatherService, private store: Store<weather.types.WeatherState>) {
  }

  ngOnInit() {
    this.store.select(weather.selectors.getWeatherResults).subscribe(results => {
      const summary = new Array<Summary>();
      if (results) {
        Object.keys(results).map(id => {
          const newSummary: Summary = {
            city: id,
            temps: {}
          };
          const data = results[id];
          data.list.forEach((item, index) => {
            if (index % 2 === 0) { return; }
            const time = new Date(item.dt_txt).toLocaleTimeString();
            newSummary.temps[time] = item.main.temp;
          });
          summary.push(newSummary);
        });
      }
      this.weatherResults = summary;
    });
  }

  citySearch(searchValue: string) {
    this.store.dispatch(new weather.actions.DoWeatherCitySearch(searchValue));
  }

  // function format_time(date_obj) {
  //   // formats a javascript Date object into a 12h AM/PM time string
  //   var hour = date_obj.getHours();
  //   var minute = date_obj.getMinutes();
  //   var amPM = (hour > 11) ? "pm" : "am";
  //   if(hour > 12) {
  //     hour -= 12;
  //   } else if(hour == 0) {
  //     hour = "12";
  //   }
  //   if(minute < 10) {
  //     minute = "0" + minute;
  //   }
  //   return hour + ":" + minute + amPM;
  // }
}
