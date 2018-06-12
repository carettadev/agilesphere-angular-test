import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../types/weather';


export const getWeatherState = createFeatureSelector<WeatherState>('weather');

export const getWeatherResults = createSelector (
  getWeatherState,
  (state: any) => state.weatherReducer.searchResults
);
