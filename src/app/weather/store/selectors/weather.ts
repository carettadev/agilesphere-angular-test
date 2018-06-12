import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../types/weather';
import { Weather } from '../../../model/weather';


export const getWeatherState = createFeatureSelector<WeatherState>('weather');

export const getWeatherResults = createSelector (
  getWeatherState,
  (state: any) => state && state.weatherReducer ? state.weatherReducer.searchResults as Weather : {}
);
