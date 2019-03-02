import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOverRidesComponent } from './popOverRides.component';

describe('PopOverRidesComponent', () => {
  let component: PopOverRidesComponent;
  let fixture: ComponentFixture<PopOverRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOverRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOverRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
