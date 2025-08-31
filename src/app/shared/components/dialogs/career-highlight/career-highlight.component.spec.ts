import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerHighlightComponent } from './career-highlight.component';

describe('CareerHighlightComponent', () => {
  let component: CareerHighlightComponent;
  let fixture: ComponentFixture<CareerHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerHighlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
