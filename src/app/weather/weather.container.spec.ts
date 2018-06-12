import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;


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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('createSummaryFromResults', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('citySearch', () => {
    it('dispatch action correctly', () => {
      const value: string = "mockSearchString";
      expect(store.dispatch).toHaveBeenCalledWith(value);
    });
  });
});
