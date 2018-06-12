import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from './store';
import { WeatherState } from './store/types/weather';
import { DoWeatherCitySearch } from './store/actions/weather';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: Store<WeatherState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainer ],
      imports: [
        StoreModule.forRoot(reducers)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should create subscription to store', () => {
      expect(component.resultsObs).toBeDefined();
    });
  });

  describe('createSummaryFromResults', () => {
    it('should create a summary list correctly', () => {
      const results: any = {
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
      const list = component.createSummaryFromResults(results);
      expect(list).toEqual([
        {
          city: 'Country1',
          times: [
            new Date('2018-06-12 18:00:00'),
            new Date('2018-06-12 19:00:00'),
            new Date('2018-06-12 20:00:00')],
          temps: [1, 2, 3]
        },
        {
          city: 'Country2',
          times: [
            new Date('2018-06-12 01:00:00'),
            new Date('2018-06-12 02:00:00'),
            new Date('2018-06-12 03:00:00'),
            new Date('2018-06-12 04:00:00')],
          temps: [1, 2, 3, 4]
        }
      ]);
    });

    it('should return an empty array if no results are undefined', () => {
        const results: any = undefined;
        const list = component.createSummaryFromResults(results);
        expect(list).toEqual([]);
    });

    it('should return an empty array if results are an empty object', () => {
      const results: any = {};
      const list = component.createSummaryFromResults(results);
      expect(list).toEqual([]);
  });
  });

  describe('citySearch', () => {
    it('dispatch action correctly', () => {
      const value = 'mockSearchString';
      component.citySearch(value);
      expect(store.dispatch).toHaveBeenCalledWith(new DoWeatherCitySearch(value));
    });
  });
});
