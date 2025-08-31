import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output() cancel = new EventEmitter<void>();


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

  form: FormGroup;
  editing = false;
  editIndex: number | null = null;
  isAdmin = true;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      proficiency: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  onAdd() {
    this.editing = true;
    this.editIndex = null;
    this.form.reset({ name: '', proficiency: 0 });
  }

  onSave() {
    if (this.form.valid) {
      const value = this.form.value as Technology;
      if (this.editIndex === null) {
        this.technologies.push(value);
      } else {
        this.technologies[this.editIndex] = value;
      }
      this.editing = false;
      this.editIndex = null;
    }
  }

  onCancel() {
    this.editing = false;
    this.editIndex = null;
  }

  onBack() {
    this.cancel.emit();
  }

}
