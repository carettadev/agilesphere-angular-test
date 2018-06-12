import { TestBed } from '@angular/core/testing';
import { WeatherEffects } from './weather';
import { WeatherService } from '../../weather.service';
import { Actions, ofType } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { DoWeatherCitySearch, AddWeatherResults, SearchFailed } from '../actions/weather';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Weather } from '../../../model/weather';
import { reducers } from '..';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

describe('WeatherEffects', () => {
  let weatherEffects;
  let weatherService;
  let store;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot(reducers)
    ],
    providers: [
      WeatherEffects,
      Actions,
      {
        provide: WeatherService,
        useValue: jasmine.createSpyObj('WeatherService', ['searchWeatherForCity'])
      }
    ]
  }));

  beforeEach(() => {
    weatherEffects = TestBed.get(WeatherEffects);
    weatherService = TestBed.get(WeatherService);
    store = TestBed.get(Store);
  });

  describe('doSearch$', () => {
    it('should return a ADD_WEATHER_RESULTS action, on success', function () {
      const serviceResponse = {
        'Country1': {
          'list': [
            {dt_txt: '2018-06-12 18:00:00', main: { temp: 1}},
            {dt_txt: '2018-06-12 19:00:00', main: { temp: 2}},
            {dt_txt: '2018-06-12 20:00:00', main: { temp: 3}}]
        },
        'Country2': {
          'list': [
            {dt_txt: '2018-06-12 01:00:00', main: { temp: 1}},
            {dt_txt: '2018-06-12 02:00:00', main: { temp: 2}},
            {dt_txt: '2018-06-12 03:00:00', main: { temp: 3}},
            {dt_txt: '2018-06-12 04:00:00', main: { temp: 4}}]
        }
      };

      weatherService.searchWeatherForCity.and.returnValue(of(serviceResponse));

      const actions: Observable<any> = cold('a', { a: new DoWeatherCitySearch('someSearchString') });

      const effects = new WeatherEffects(new Actions(actions), store, weatherService);

      const expected = cold('b', { b: new AddWeatherResults(serviceResponse as Weather) });

      expect(effects.doSearch$).toBeObservable(expected);
    });

    it('should return a SEARCH_FAILURE action, on failure', function () {
      const error = new HttpErrorResponse({ error: 404 });

      weatherService.searchWeatherForCity.and.returnValue(_throw('any old error'));

      const actions: Observable<any> = cold('a', { a: new DoWeatherCitySearch('someSearchString') });

      const effects = new WeatherEffects(new Actions(actions), store, weatherService);

      const expected = cold('b', { b: new SearchFailed() });

      expect(effects.doSearch$).toBeObservable(expected);
    });
  });
});
