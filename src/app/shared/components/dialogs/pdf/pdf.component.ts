import { Component, inject, output, signal } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { TextareaComponent } from '../../textarea/textarea.component';
import { ButtonComponent } from '../../button/button.component';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

const MAX_PDF_BYTES = 20 * 1024 * 1024;

@Component({
  selector: 'app-pdf',
  imports: [
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    DecimalPipe,
    TranslatePipe,
  ],
  templateUrl: './pdf.component.html',
  standalone: true,
  styleUrl: './pdf.component.css',
})
export class PdfComponent {
  private fb = inject(FormBuilder);

  cancel = output<void>();

  selectedFile = signal<File | null>(null);

  form = this.fb.group({
    title: ['', [Validators.maxLength(64)]],
    description: ['', [Validators.maxLength(16384)]],
    file: [null as File | null, [Validators.required]],
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) {
      this.selectedFile.set(null);
      this.form.patchValue({ file: null });
      return;
    }

    if (file.type !== 'application/pdf') {
      this.selectedFile.set(null);
      this.form.patchValue({ file: null });
      return;
    }

    if (file.size > MAX_PDF_BYTES) {
      this.selectedFile.set(null);
      this.form.patchValue({ file: null });
      return;
    }

    this.selectedFile.set(file);
    this.form.patchValue({ file });
  }

  onSave() {
    console.log(this.form.getRawValue());
  }

  onCancel() {
    this.cancel.emit();
    this.selectedFile.set(null);
  }
}
