import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {InputComponent} from '../../input/input.component';
import {TextareaComponent} from '../../textarea/textarea.component';
import {ButtonComponent} from '../../button/button.component';
import {DatePickerComponent} from '../../date-picker/date-picker.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgIf} from '@angular/common';


const MAX_PDF_BYTES = 20 * 1024 * 1024; // 20 MB

export type PdfSectionSavedPayload = {
  title: string;
  subtitle?: string;
  description?: string;
  file?: File | null;
  previewUrl?: string | null;
};

@Component({
  selector: 'app-pdf',
  imports: [
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    DecimalPipe,
    NgIf
  ],
  templateUrl: './pdf.component.html',
  standalone: true,
  styleUrl: './pdf.component.css'
})
export class PdfComponent {
  private fb = inject(FormBuilder);

  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<PdfSectionSavedPayload>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    subtitle: ['', [Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(2000)]],
    file: [null as File | null, [Validators.required]],
  });

  // Angular signals a kényelmes view-frissítéshez
  previewUrl = signal<string | null>(null);
  selectedFile = signal<File | null>(null);
  fileError = signal<string | null>(null);

  onFileSelected(event: Event) {
    this.fileError.set(null);
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) {
      this.selectedFile.set(null);
      this.form.patchValue({ file: null });
      this.revokePreview();
      return;
    }

    if (file.type !== 'application/pdf') {
      this.fileError.set('Csak PDF fájl tölthető fel.');
      this.selectedFile.set(null);
      this.form.patchValue({ file: null });
      this.revokePreview();
      return;
    }

    // @ts-ignore
    if (file.size > MAX_PDF_BYTES) {
      this.fileError.set('A fájl túl nagy (max. 20 MB).');
      this.selectedFile.set(null);
      this.form.patchValue({ file: null });
      this.revokePreview();
      return;
    }

    this.selectedFile.set(file);
    this.form.patchValue({ file });

    this.revokePreview();
    this.previewUrl.set(URL.createObjectURL(file));
  }

  onSave() {
    if (this.form.invalid || this.fileError()) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, subtitle, description, file } = this.form.value;

    this.saved.emit({
      title: title ?? '',
      subtitle: subtitle ?? undefined,
      description: description ?? undefined,
      file: (file as File | null) ?? null,
      previewUrl: this.previewUrl(),
    });

    // Ha itt azonnal küldenéd a backendnek:
    // const formData = new FormData();
    // formData.append('title', title ?? '');
    // if (subtitle) formData.append('subtitle', subtitle);
    // if (description) formData.append('description', description);
    // if (file instanceof File) formData.append('file', file);
    // this.service.upload(formData).subscribe(...)
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset();
    this.selectedFile.set(null);
    this.fileError.set(null);
    this.revokePreview();
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  private revokePreview() {
    const url = this.previewUrl();
    if (url) {
      URL.revokeObjectURL(url);
      this.previewUrl.set(null);
    }
  }

  baseClasses() {
    return 'bg-white';
  }
}
