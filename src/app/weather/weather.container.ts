import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  template: `
  <app-search></app-search>
  <app-results></app-results>  `
})
export class WeatherContainer {

  constructor() {}

  citySearch() {
    // TO BE IMPLMENTED
  }
}
