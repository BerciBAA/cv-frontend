import { Component, effect, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { ButtonComponent } from '../../button/button.component';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { TextareaComponent } from '../../textarea/textarea.component';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { TranslatePipe } from '@ngx-translate/core';
import { careerValidator } from './validators/careerValidator';

@Component({
  selector: 'app-career-highlight',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    DatePickerComponent,
    TextareaComponent,
    CheckboxComponent,
    TranslatePipe,
  ],
  templateUrl: './career-highlight.component.html',
})
export class CareerHighlightComponent {
  private fb = inject(FormBuilder);
  cancel = output<void>();

  form = this.fb.group(
    {
      title: this.fb.control<string>('', {
        validators: [Validators.required, Validators.maxLength(64)],
      }),
      company: this.fb.control<string>('', {
        validators: [Validators.required, Validators.maxLength(64)],
      }),
      start: this.fb.control<string>('', { validators: [Validators.required] }),
      end: this.fb.control<string>(''),
      current: this.fb.control<boolean>(false),
      description: this.fb.control<string>('', {
        validators: [Validators.maxLength(1024)],
      }),
    },
    { validators: [careerValidator] },
  );

  constructor() {
    effect(() => {});

    this.form.controls.current.valueChanges.subscribe((isCurrent) => {
      this.syncEndControl(!!isCurrent);
    });
  }

  private syncEndControl(isCurrent: boolean) {
    const endCtrl = this.form.controls.end;
    if (isCurrent) {
      endCtrl.setValue(null, { emitEvent: false });
      endCtrl.disable({ emitEvent: false });
    } else {
      endCtrl.enable({ emitEvent: false });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave() {
    console.log(this.form.getRawValue());
  }
}
