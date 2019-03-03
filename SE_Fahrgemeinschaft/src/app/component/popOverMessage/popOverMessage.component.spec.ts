import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOverMessageComponent } from './popOverMessage.component';

describe('PopOverMessageComponent', () => {
  let component: PopOverMessageComponent;
  let fixture: ComponentFixture<PopOverMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOverMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOverMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
