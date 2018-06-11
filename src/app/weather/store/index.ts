import * as actions from './actions/weather';
import * as types from './types/weather';
import * as reducers from './reducers/weather';
import { WeatherEffects } from './effects/weather';
import * as selectors from './selectors/weather';
import { Type } from '@angular/core';

export { actions, types, selectors, reducers };

export const effects: Type<any>[] = [WeatherEffects];
