import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionCardComponent } from './add-section-card.component';

describe('AddSectionCardComponent', () => {
  let component: AddSectionCardComponent;
  let fixture: ComponentFixture<AddSectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSectionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
