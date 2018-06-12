import { Weather } from '../../../model/weather';
import { Action } from '@ngrx/store';

export interface WeatherState {
    searchValue: string;
    searchResults: {[city: string]: Weather };
    searchFailed: boolean;
}

export interface TypedAction<T> extends Action {
  payload: T;
}
