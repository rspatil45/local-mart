import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutconfirmationComponent } from './log-outconfirmation.component';

describe('LogOutconfirmationComponent', () => {
  let component: LogOutconfirmationComponent;
  let fixture: ComponentFixture<LogOutconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogOutconfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
