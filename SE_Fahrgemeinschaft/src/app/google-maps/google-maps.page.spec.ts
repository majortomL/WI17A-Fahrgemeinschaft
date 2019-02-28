import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsPage } from './google-maps.page';

describe('GoogleMapsPage', () => {
  let component: GoogleMapsPage;
  let fixture: ComponentFixture<GoogleMapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
