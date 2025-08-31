import {Component, computed, EventEmitter, inject, Input, Output} from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from '../../button/button.component';
import {NgClass, NgIf} from '@angular/common';
import {QuillEditorComponent} from 'ngx-quill';
import {ThemeService} from '../../../../core/services/theme/theme.service';
import {InputComponent} from '../../input/input.component';



@Component({
  selector: 'app-html-editor',
  standalone: true,
  imports: [ReactiveFormsModule, CKEditorModule, ButtonComponent, NgIf, QuillEditorComponent, InputComponent, NgClass,],
  templateUrl: './html-editor.component.html',
  styleUrl: './html-editor.component.css',
})
export class HtmlEditorComponent {

  private themeService = inject(ThemeService);

  private editorTheme = this.themeService.componentTheme('editor');

  @Output() cancel = new EventEmitter<void>();
  @Input() title:string ='';
  @Input() description:string = '';

  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true }),
    html:  new FormControl<string>('', { nonNullable: true })
  });

  onSave() {
    if (this.form.invalid) return;
    const { title, html } = this.form.getRawValue();
    console.log('Saving...', { title, html });
  }

  onCancel() {
    this.cancel.emit();
  }

  baseClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.editorTheme();

    return [
      bg,
      bgHover,
      text,
      textHover,
      border
    ];
  });

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ],
    blotFormatter: {},
  };
}
