import {
  Component,
  computed,
  forwardRef,
  inject,
  Input,
  model,
} from '@angular/core';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { InputComponent } from '../input/input.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  imports: [],
  templateUrl: './textarea.component.html',
  standalone: true,
  styleUrl: './textarea.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  private themeService = inject(ThemeService);
  value = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() type: string = 'input';

  private inputTheme = this.themeService.componentTheme('input');
  private labelTheme = this.themeService.componentTheme('label');

  disabled = false;

  labelClasses = computed(() => {
    const { text, textHover } = this.labelTheme();
    return [
      'block mb-1 text-base font-medium transition-colors',
      text,
      textHover,
    ].join(' ');
  });

  inputClasses = computed(() => {
    const { bg, bgHover, text, textHover } = this.inputTheme();
    return [
      'w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition',
      bg,
      bgHover,
      text,
      textHover,
    ].join(' ');
  });

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: any): void {
    this.value = v ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(v: string): void {
    this.value = v;
    this.onChange(v);
  }
}
