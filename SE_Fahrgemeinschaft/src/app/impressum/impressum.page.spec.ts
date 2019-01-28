import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressumPage } from './impressum.page';

describe('ImpressumPage', () => {
  let component: ImpressumPage;
  let fixture: ComponentFixture<ImpressumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressumPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
