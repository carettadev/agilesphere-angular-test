import { Weather } from '../../../model/weather';
import { TypedAction } from '../types/weather';

export const DO_WEATHER_CITY_SEARCH =      '[Weather] Do Search';
export const ADD_WEATHER_RESULTS =      '[Weather] Add results for city';

export class DoWeatherCitySearch implements TypedAction<string> {
  readonly type = DO_WEATHER_CITY_SEARCH;

  constructor(public payload: string) { }
}

export class AddWeatherResults implements TypedAction<Weather> {
  readonly type = ADD_WEATHER_RESULTS;

  constructor(public payload: Weather) { }
}

export type All = DoWeatherCitySearch | AddWeatherResults;


