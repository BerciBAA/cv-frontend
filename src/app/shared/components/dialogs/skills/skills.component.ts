import {Component, EventEmitter, inject, Input, output, Output} from '@angular/core';
import {ButtonComponent} from '../../button/button.component';
import {InputComponent} from '../../input/input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {HasRolesDirective} from 'keycloak-angular';
import {SkillCardComponent} from '../../skill-card/skill-card.component';

interface Technology {
  name: string;
  proficiency: number;
}

@Component({
  selector: 'app-skills',
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    NgIf,
    HasRolesDirective,
    NgForOf,
    SkillCardComponent
  ],
  templateUrl: './skills.component.html',
  standalone: true,
  styleUrl: './skills.component.css'
})
export class SkillsComponent {


  private fb = inject(FormBuilder)
  cancel = output<void>();

  protected editing = false;
  protected editIndex: number | null = null;

  form = this.fb.group({
    name: ['', [Validators.max(64)] ],
    proficiency: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  technologies: Technology[] = [
    { name: 'Angular', proficiency: 80 },
    { name: 'Java', proficiency: 10 },
    { name: 'SpringSpringSpringSpriSpringSpringSpringSpringng Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
    { name: 'Spring Boot', proficiency: 70 },
  ];

  onlyNumbers(event: KeyboardEvent) {
    if (!/^\d$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
    }
  }


  onAdd() {
    this.editing = true;
    this.editIndex = null;
    this.form.reset({ name: '', proficiency: 0 });
  }

  onSave() {
    console.log(this.form.getRawValue())
  }

  onCancel() {
    this.editing = false;
    this.editIndex = null;
  }

  onBack() {
    this.cancel.emit();
  }

}
