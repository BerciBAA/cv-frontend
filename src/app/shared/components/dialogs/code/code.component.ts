import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../button/button.component';
import {TextareaComponent} from '../../textarea/textarea.component';
import {InputComponent} from '../../input/input.component';
import {Highlight} from 'ngx-highlightjs';
import {DropdownComponent} from '../../dropdown/dropdown.component';

export type CodeSavedPayload = {
  title: string;
  code: string;
  language: string;
};

@Component({
  selector: 'app-code',
  imports: [
    ButtonComponent,
    TextareaComponent,
    InputComponent,
    ReactiveFormsModule,
    Highlight,
    DropdownComponent
  ],
  templateUrl: './code.component.html',
  standalone: true,
  styleUrl: './code.component.css'
})
export class CodeComponent {
  private fb = inject(FormBuilder);

  @Output() saved = new EventEmitter<CodeSavedPayload>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    language: ['typescript', [Validators.required]],
    code: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit(this.form.value as CodeSavedPayload);
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset({ language: 'typescript' });
  }
}
