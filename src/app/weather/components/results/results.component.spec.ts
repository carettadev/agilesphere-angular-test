import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ResultsComponent } from './results.component';
import { Time12hPipe } from '../../utils/time12h.pipe';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsComponent,
        Time12hPipe ],
      imports: [ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the times array when the result input is changed ', () => {
    component.results = [
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
    ];
    component.ngOnChanges();
    expect(component.times.length).toEqual(3);
  });
});


