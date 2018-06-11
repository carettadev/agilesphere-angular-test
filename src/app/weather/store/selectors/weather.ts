import { Summary, Weather } from './../../../model/weather';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../types/weather';
import { forEach } from '@angular/router/src/utils/collection';


export const getWeatherState = createFeatureSelector<WeatherState>('weather');

export const getWeatherResults = createSelector (
  getWeatherState,
  (state: any) => state.weatherReducer.searchResults
);
