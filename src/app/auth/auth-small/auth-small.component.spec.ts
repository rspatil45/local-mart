import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSmallComponent } from './auth-small.component';

describe('AuthSmallComponent', () => {
  let component: AuthSmallComponent;
  let fixture: ComponentFixture<AuthSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
