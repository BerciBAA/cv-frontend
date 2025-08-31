import {Component, Input, computed, forwardRef, inject, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme/theme.service';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }]
})
export class CheckboxComponent implements ControlValueAccessor {
  private theme = inject(ThemeService);

  @Input() label = '';
  @Input() inlineText = '';
  @Output() checkBoxChanged = new EventEmitter<void>() ;

  checked = false;
  disabled = false;

  private labelTheme = this.theme.componentTheme('label');
  private inputTheme = this.theme.componentTheme('input');

  labelClasses = computed(() => {
    const { text, textHover } = this.labelTheme();
    return ['text-base font-medium transition-colors', text, textHover].join(' ');
  });

  textClasses = computed(() => {
    const { text } = this.labelTheme();
    return ['text-sm', text].join(' ');
  });

  checkboxClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.inputTheme();
    return ['h-5 w-5 rounded border transition', bg, bgHover, text, textHover, border].join(' ');
  });


  private onChange: (v: any) => void = () => {  };
  private onTouched: () => void = () => {};

  writeValue(v: any): void { this.checked = !!v; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onToggle(v: boolean): void { this.checked = v; this.checkBoxChanged.emit(); this.onChange(v); }
  onBlur(): void { this.onTouched(); }
}
