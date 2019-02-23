import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRidePage } from './create-ride.page';

describe('CreateRidePage', () => {
  let component: CreateRidePage;
  let fixture: ComponentFixture<CreateRidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
