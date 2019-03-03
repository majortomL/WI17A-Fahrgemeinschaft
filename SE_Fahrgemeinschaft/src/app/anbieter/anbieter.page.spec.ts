import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnbieterPage } from './anbieter.page';

describe('AnbieterPage', () => {
  let component: AnbieterPage;
  let fixture: ComponentFixture<AnbieterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnbieterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnbieterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
