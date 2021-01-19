import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartElementComponent } from './part-element.component';

describe('PartElementComponent', () => {
  let component: PartElementComponent;
  let fixture: ComponentFixture<PartElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
