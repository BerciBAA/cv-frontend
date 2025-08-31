import {Component, computed, forwardRef, HostListener, inject, Input, signal, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {ThemeService} from '../../../core/services/theme/theme.service';
import {STYLES} from '../../../core/services/theme/interfaces/styles.model';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatDatepickerToggle,
    MatNativeDateModule, ReactiveFormsModule, NgIf, NgClass
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor{

  private theme = inject(ThemeService);
  private adapter = inject(DateAdapter<Date>);

  @Input() label = '';
  @Input() placeholder = '';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabled = false;
  @Input() required = false;

  date: Date | null = null;


  inputClasses = computed(() => {
    const { bg, text, border } = this.theme.componentTheme('input')();
    return [
      bg, text, border,
    ].join(' ');
  });

  labelClasses = computed(() => {
    const { text } = this.theme.componentTheme('label')();
    return ['block mb-1 text-lg', text].join(' ');
  });

  panelClass = computed(() =>
    this.theme.isDark() ? 'tw-date-panel tw-dark' : 'tw-date-panel tw-light'
  );

  constructor() {
    this.adapter.setLocale('hu-HU');
  }


  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: any): void {
    if (!v) { this.date = null; return; }
    if (v instanceof Date) { this.date = v; return; }
    const parsed = this.adapter.parse(v, 'yyyy-MM-dd');
    this.date = parsed instanceof Date && !isNaN(parsed.getTime()) ? parsed : null;
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onDateInput(d: Date | null): void {
    this.date = d;
    const out = d ? this.adapter.format(d, 'yyyy-MM-dd') : '';
    this.onChange(out);
  }
}
