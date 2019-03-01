import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachfragerPage } from './nachfrager.page';

describe('NachfragerPage', () => {
  let component: NachfragerPage;
  let fixture: ComponentFixture<NachfragerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachfragerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachfragerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
