import { City, Weather } from './../../../model/weather';
import { WeatherState } from '../types/weather';
import * as actions from '../actions/weather';

const initialState: WeatherState = {
    searchValue: '',
    searchResults: {}
};

export function weatherReducer(state = initialState, action: actions.All): WeatherState {
  switch (action.type) {
    case actions.DO_WEATHER_CITY_SEARCH: {

      return { ...state, searchValue: action.payload } ;
    }
    case actions.ADD_WEATHER_RESULTS: {
      const weatherResults = {...state.searchResults};
      if (action.payload && action.payload.city) {
        weatherResults[action.payload.city.name] = action.payload;
      }
      return { ...state, searchResults: weatherResults };
    }
    default:
      return state;
  }
}
