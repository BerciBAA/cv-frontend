import {
  Component,
  OnChanges,
  effect,
  output, input, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../input/input.component';
import {ButtonComponent} from '../../button/button.component';
import {DatePickerComponent} from '../../date-picker/date-picker.component';
import {TextareaComponent} from '../../textarea/textarea.component';
import {CheckboxComponent} from '../../checkbox/checkbox.component';

export type ExperienceModel = {
  title: string;
  company: string;
  start: string;
  end?: string | null;
  current: boolean;
  description: string;
};

@Component({
  selector: 'app-career-highlight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent, DatePickerComponent, TextareaComponent, CheckboxComponent],
  templateUrl: './career-highlight.component.html'
})
export class CareerHighlightComponent{

  value = input<ExperienceModel | null>(null);
  canEdit = input<boolean>(false);
  save = output<ExperienceModel>();
  cancel = output<void>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    title:       ['', [Validators.required, Validators.maxLength(1)]],
    companyName: ['', [Validators.required, Validators.maxLength(64)]],
    startDate:   ['', [Validators.required]],
    endDate:     ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(1024)]],
    current:     [false]
  });


  onCancel(): void {
    this.cancel.emit();
  }

  changeCheckBox(){
    this.form.get("current")?.value ? this.form.get("endDate")?.enable() : this.form.get("endDate")?.disable();
  }

  onSave() {
    console.log(this.form.getRawValue())
  }
}
