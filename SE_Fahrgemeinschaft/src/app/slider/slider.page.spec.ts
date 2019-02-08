import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sliderpage } from './slider.page';

describe('Sliderpage', () => {
  let component: Sliderpage;
  let fixture: ComponentFixture<Sliderpage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sliderpage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sliderpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
