import {Component, Input, computed, inject, model, Signal, signal, input, InputSignal, forwardRef} from '@angular/core';
import {NgClass, NgFor, NgIf} from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme/theme.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgFor, NgIf, MatIcon, NgClass],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  private themeService = inject(ThemeService);

  @Input() label = '';
  @Input() placeholder = '';
  options: InputSignal<DropdownOption<string>[]> = input<DropdownOption<string>[]>([]);
  @Input() id = 'custom-dropdown';

  value: string = '';
  disabled = false;

  private inputTheme = this.themeService.componentTheme('input');
  private labelTheme = this.themeService.componentTheme('label');

  labelClasses = computed(() => {
    const { text, textHover } = this.labelTheme();
    return ['block mb-1 text-base font-medium transition-colors', text, textHover].join(' ');
  });

  selectClasses = computed(() => {
    const { bg, bgHover, text, textHover } = this.inputTheme();
    return [
      'w-full border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-black transition',
      bg, bgHover, text, textHover,
    ].join(' ');
  });

  private onChangeCb: (v: any) => void = () => {};
  private onTouchedCb: () => void = () => {};

  writeValue(v: any): void {
    this.value = (v ?? '') as string;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // UI handlers
  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const val = target.value;
    this.value = val;
    this.onChangeCb(val);
  }

  onBlur(): void {
    this.onTouchedCb();
  }
}
