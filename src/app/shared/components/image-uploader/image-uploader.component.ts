import { Component, EventEmitter, HostListener, Input, OnDestroy, Output, Signal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoredImage} from './models/store-image.models';
import {ButtonComponent} from '../button/button.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslatePipe],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnDestroy {
  @Input() accept = 'image/*';
  @Input() maxFiles: number = Infinity;
  @Input() maxSizeMB: number = Infinity;
  @Input() disabled = false;
  @Input() showAddButton = true;

  @Output() filesChange = new EventEmitter<File[]>();

  private _images = signal<StoredImage[]>([]);
  images: Signal<StoredImage[]> = computed(() => this._images());
  private _dragOver = signal(false);
  dragOver = computed(() => this._dragOver());
  private _lastError = signal<string | null>(null);
  lastError = computed(() => this._lastError());

  private _emit = effect(() => {
    const files = this._images().map(x => x.file);
    this.filesChange.emit(files);
  });

  setFiles(files: File[]) {
    this.clear();
    this.addFiles(files);
  }

  remove(index: number) {
    const list = [...this._images()];
    const [removed] = list.splice(index, 1);
    if (removed) URL.revokeObjectURL(removed.url);
    this._images.set(list);
  }

  clear() {
    this._images().forEach(x => URL.revokeObjectURL(x.url));
    this._images.set([]);
  }

  onFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    this.addFiles(Array.from(input.files));
    input.value = '';
  }

  @HostListener('dragover', ['$event']) onDragOver(e: DragEvent) {
    e.preventDefault();
    if (this.disabled) return;
    this._dragOver.set(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(e: DragEvent) {
    e.preventDefault();
    this._dragOver.set(false);
  }

  @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
    e.preventDefault();
    this._dragOver.set(false);
    if (this.disabled) return;
    const files = Array.from(e.dataTransfer?.files || []).filter(f => !!f);
    if (files.length) this.addFiles(files);
  }

  private addFiles(files: File[]) {
    this._lastError.set(null);

    const imagesOnly = files.filter(f => this.matchesAccept(f) && f.type.startsWith('image/'));
    if (imagesOnly.length !== files.length) {
      this._lastError.set('Some files were skipped (not images or not accepted).');
    }

    const sizeOk = imagesOnly.filter(f => this.bytesToMB(f.size) <= this.maxSizeMB);
    if (sizeOk.length !== imagesOnly.length) {
      this._lastError.set('Some files were too large and were skipped.');
    }

    const current = this._images();
    const room = Math.max(0, this.maxFiles - current.length);
    const toAdd = sizeOk.slice(0, room);
    if (room < sizeOk.length) this._lastError.set('Some files were skipped due to maxFiles limit.');

    const withUrls: StoredImage[] = toAdd.map(file => ({ file, url: URL.createObjectURL(file) }));
    this._images.set([...current, ...withUrls]);
  }

  private matchesAccept(file: File): boolean {
    if (!this.accept || this.accept === '*/*') return true;
    const parts = this.accept.split(',').map(s => s.trim()).filter(Boolean);
    return parts.some(p => {
      if (p.endsWith('/*')) {
        const base = p.slice(0, p.indexOf('/'));
        return file.type.startsWith(base + '/');
      }
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      return file.type === p || ext === p.toLowerCase();
    });
  }

  private bytesToMB(bytes: number): number { return +(bytes / (1024 * 1024)).toFixed(2); }

  truncate(name: string, max = 16) {
    return name.length <= max ? name : name.slice(0, max - 3) + '...';
  }

  prettySize(bytes: number) {
    const kb = 1024, mb = kb * 1024;
    if (bytes >= mb) return (bytes / mb).toFixed(1) + ' MB';
    if (bytes >= kb) return (bytes / kb).toFixed(0) + ' KB';
    return bytes + ' B';
  }

  ngOnDestroy(): void { this.clear(); }

  protected readonly Infinity = Infinity;
}
