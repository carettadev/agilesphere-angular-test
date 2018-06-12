import { WeatherState } from './../types/weather';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import * as weatherActions from '../actions/weather';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Weather } from '../../../model/weather';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WeatherEffects {

   @Effect()
    doSearch$: Observable<Action> = this.actions$.pipe(
    ofType<weatherActions.DoWeatherCitySearch>(weatherActions.DO_WEATHER_CITY_SEARCH),
    mergeMap((action: weatherActions.DoWeatherCitySearch) => this.weatherService.searchWeatherForCity(action.payload)
          .pipe(map((data: Weather) => new weatherActions.AddWeatherResults(data)),
          catchError(() => of<Action>(new weatherActions.SearchFailed())))));

    constructor(
       private actions$: Actions,
       private store$: Store<WeatherState>,
       private weatherService: WeatherService
      ) {}
}
