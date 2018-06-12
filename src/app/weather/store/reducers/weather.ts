import { WeatherState } from '../types/weather';
import * as actions from '../actions/weather';

const initialState: WeatherState = {
    searchValue: '',
    searchResults: {},
    searchFailed: false
};

export function weatherReducer(state = initialState, action: actions.All): WeatherState {
  switch (action.type) {
    case actions.DO_WEATHER_CITY_SEARCH: {

      return { ...state, searchValue: action.payload, searchFailed: false  } ;
    }
    case actions.ADD_WEATHER_RESULTS: {
      const weatherResults = {...state.searchResults};
      if (action.payload && action.payload.city) {
        weatherResults[action.payload.city.name] = action.payload;
      }
      return { ...state, searchResults: weatherResults };
    }
    case actions.SEARCH_FAILED: {
      return { ...state, searchFailed: true } ;
    }
    default:
      return state;
  }
}
