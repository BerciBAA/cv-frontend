import {Component, EventEmitter, Input, Output, inject, signal, computed, HostBinding} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {ThemeService} from '../../../core/services/theme/theme.service';
import {DialogRef} from '@angular/cdk/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {InputComponent} from '../input/input.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {ButtonComponent} from '../button/button.component';
import {ImageUploaderComponent} from '../image-uploader/image-uploader.component';
import {TextareaComponent} from '../textarea/textarea.component';

export enum Privacy {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export interface PageMetaFormValue {
  name: string;
  description: string | null;
  privacy: Privacy; // PRIVATE | PUBLIC
}


@Component({
  selector: 'app-page-info',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    ImageUploaderComponent,
    TextareaComponent
  ],
  templateUrl: './page-info.component.html',
  standalone: true,
  styleUrl: './page-info.component.css'
})
export class PageInfoComponent {

  private themeService = inject(ThemeService);

  private componentSelectorTheme = this.themeService.componentTheme('componentSelector');
  private closeButtonTheme = this.themeService.componentTheme('closeButton');

  private ref = inject(DialogRef<PageInfoComponent>);


  private fb = inject(FormBuilder);

  @Input() initialValue: Partial<PageMetaFormValue> | null = null;

  @Output() submitted = new EventEmitter<PageMetaFormValue>();
  @Output() cancelled = new EventEmitter<void>();

  readonly Privacy = Privacy;

  form = this.fb.group({

    title: ['', [Validators.maxLength(64)]],
    description: ['', [Validators.maxLength(64)]],
    isPrivate: [false],
    file: this.fb.control<File[] | null>(null),

  });

  onFiles(files: File[]) {
    this.form.get('file')?.setValue(files);
 }

  onSave(){
    console.log(this.form.getRawValue())
  }


  close() { this.ref.close(); }

  baseClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.componentSelectorTheme();
    return [
      bg,
      bgHover,
      text,
      textHover,
      border
    ];
  });

  @HostBinding('class')
  get hostClasses(): string {
    return [
      ...this.baseClasses(),
    ].join(' ');
  }

  closeButtonBaseClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.closeButtonTheme();

    return [
      bg,
      bgHover,
      text,
      textHover,
      border
    ];
  });

}
