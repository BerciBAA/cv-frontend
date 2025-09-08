import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainSectionComponent } from './add-main-section.component';

describe('AddMainSectionComponent', () => {
  let component: AddMainSectionComponent;
  let fixture: ComponentFixture<AddMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
