import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachfragerResultsPage } from './nachfrager-results.page';

describe('NachfragerResultsPage', () => {
  let component: NachfragerResultsPage;
  let fixture: ComponentFixture<NachfragerResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachfragerResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachfragerResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
