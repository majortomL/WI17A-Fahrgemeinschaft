import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenrouteservicePage } from './openrouteservice.page';

describe('OpenrouteservicePage', () => {
  let component: OpenrouteservicePage;
  let fixture: ComponentFixture<OpenrouteservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenrouteservicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenrouteservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
