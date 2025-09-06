import {Component, computed, inject, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../button/button.component';
import {NgClass} from '@angular/common';
import {QuillEditorComponent} from 'ngx-quill';
import {ThemeService} from '../../../../core/services/theme/theme.service';
import {InputComponent} from '../../input/input.component';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-html-editor',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, QuillEditorComponent, InputComponent, NgClass, TranslatePipe,],
  templateUrl: './html-editor.component.html',
  styleUrl: './html-editor.component.css',
})
export class HtmlEditorComponent {

  private themeService = inject(ThemeService);
  private fb = inject(FormBuilder);
  private editorTheme = this.themeService.componentTheme('editor');

  cancel = output<void>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(64)]],
    text: ['', [Validators.required, Validators.maxLength(16384)]],
  });

  onSave() {
    console.log(this.form.getRawValue())
  }

  onCancel() {
    this.cancel.emit();
  }

  baseClasses = computed(() => {
    const {bg, bgHover, text, textHover, border} = this.editorTheme();
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

      [{'header': 1}, {'header': 2}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'direction': 'rtl'}],

      [{'size': ['small', false, 'large', 'huge']}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}],

      [{'color': []}, {'background': []}],
      [{'font': []}],
      [{'align': []}],

      ['clean']
    ],
    blotFormatter: {},
  };
}
