import {Component, computed, EventEmitter, inject, input, InputSignal, output, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../button/button.component';
import {TextareaComponent} from '../../textarea/textarea.component';
import {InputComponent} from '../../input/input.component';
import {Highlight} from 'ngx-highlightjs';
import {DropdownComponent, DropdownOption} from '../../dropdown/dropdown.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-code',
  imports: [
    ButtonComponent,
    TextareaComponent,
    InputComponent,
    ReactiveFormsModule,
    Highlight,
    DropdownComponent,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './code.component.html',
  standalone: true,
  styleUrl: './code.component.css'
})
export class CodeComponent {

  private fb = inject(FormBuilder);

  cancel = output<void>();
  languages: InputSignal<string[]> = input<string[]>([]);
  protected code: string = '';

  optionsForDropdown = computed<DropdownOption<string>[]>(() =>
    (this.languages() ?? []).map(l => ({
      label: l,
      value: l,
      disabled: false,
    }))
  );

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(64)]],
    language: ['', [Validators.required]],
    code: ['', [Validators.required, Validators.minLength(16384)]],
  });

  onSave() {
    console.log(this.form.getRawValue());
  }

  onCancel() {
    this.cancel.emit();
  }
}
