import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from './store';
import { WeatherState } from './store/types/weather';
import { DoWeatherCitySearch } from './store/actions/weather';

fdescribe('WeatherContainer', () => {
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

  });

  describe('createSummaryFromResults', () => {

  });

  describe('citySearch', () => {
    it('dispatch action correctly', () => {
      const value = 'mockSearchString';
      component.citySearch(value);
      expect(store.dispatch).toHaveBeenCalledWith(new DoWeatherCitySearch(value));
    });
  });
});
