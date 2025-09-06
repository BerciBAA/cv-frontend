import { Component, ChangeDetectionStrategy, EventEmitter, Output, inject, signal, computed } from '@angular/core';
import {CommonModule, DecimalPipe, NgIf} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, Validators, FormsModule} from '@angular/forms';
import {TextareaComponent} from '../../textarea/textarea.component';
import {InputComponent} from '../../input/input.component';
import {ButtonComponent} from '../../button/button.component';

type PreviewItem = { file: File; url: string };

@Component({
  selector: 'app-projects',
  imports: [
    TextareaComponent,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    NgIf,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() saved  = new EventEmitter<{
    title: string;
    description: string;
    repoUrl: string;
    liveUrl?: string;
    images: File[];
  }>();

  title = "";
  description = signal('');
  repoUrl = signal('');
  liveUrl = signal('');

  previews = signal<PreviewItem[]>([]);
  errorMsg = signal<string | null>(null);

  private addFiles(files: File[]) {
    const next: PreviewItem[] = [];
    for (const f of files) {
      if (!f.type.startsWith('image/')) {
        this.errorMsg.set('Csak képfájl tölthető fel.');
        continue;
      }
      if (f.size > 15 * 1024 * 1024) {
        this.errorMsg.set('Max. 15 MB/kép.');
        continue;
      }
      const url = URL.createObjectURL(f);
      next.push({ file: f, url });
    }
    if (next.length) this.previews.set([...this.previews(), ...next]);
  }

  onFilesSelected(ev: Event) {
    this.errorMsg.set(null);
    const input = ev.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    this.addFiles(files);
    // reset, so selecting same files again still triggers change
    input.value = '';
  }

  onDrop(ev: DragEvent) {
    ev.preventDefault();
    this.errorMsg.set(null);
    const files = ev.dataTransfer ? Array.from(ev.dataTransfer.files) : [];
    this.addFiles(files);
  }
  onDragOver(ev: DragEvent) { ev.preventDefault(); }

  removeAt(i: number) {
    const items = this.previews();
    const item = items[i];
    if (!item) return;
    URL.revokeObjectURL(item.url);
    items.splice(i, 1);
    this.previews.set([...items]);
  }

  clearAll() {
    for (const p of this.previews()) URL.revokeObjectURL(p.url);
    this.previews.set([]);
  }

  onSave() {

  }

  onCancelClick() {
    this.cancel.emit();
  }

  ngOnDestroy() { this.clearAll(); }
}
