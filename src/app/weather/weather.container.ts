import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as weather from './store';
import { Summary } from '../model/weather';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (searched)="citySearch($event)"></app-search>
  <app-results [results]="weatherResults"></app-results>  `
})
export class WeatherContainer implements OnInit, OnDestroy {
  weatherResults = [];
  resultsObs: Subscription;

  constructor(private store: Store<weather.types.WeatherState>) {
  }

  ngOnInit() {
    this.resultsObs = this.store.select(weather.selectors.getWeatherResults).subscribe(results => {
      this.weatherResults = this.createSummaryFromResults(results);
    });
  }

  ngOnDestroy() {
    this.resultsObs.unsubscribe();
  }

  private createSummaryFromResults(results: any) {
    const summary = new Array<Summary>();
    if (results) {
      // loop through each city in results
      Object.keys(results).map(id => {
        const summaryLine: Summary = {
          city: id,
          temps: [],
          times: []
        };
        // create the list of each time/temprature returned
        results[id].list.forEach((item, index) => {
          summaryLine.times.push(new Date(item.dt_txt));
          summaryLine.temps.push(item.main.temp);
        });
        summary.push(summaryLine);
      });
    }
    return summary;
  }

  citySearch(searchValue: string) {
    this.store.dispatch(new weather.actions.DoWeatherCitySearch(searchValue));
  }
}
