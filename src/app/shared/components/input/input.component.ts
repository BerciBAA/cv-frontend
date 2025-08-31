import { Component, forwardRef, Input, computed, inject } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ThemeService } from '../../../core/services/theme/theme.service'

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }]
})
export class InputComponent implements ControlValueAccessor {
  private themeService = inject(ThemeService)

  @Input() placeholder = ''
  @Input() label = ''
  @Input() type: 'text' | 'email' | 'number' | 'password' = 'text'

  value = ''
  disabled = false

  private inputTheme = this.themeService.componentTheme('input')
  private labelTheme = this.themeService.componentTheme('label')

  labelClasses = computed(() => {
    const { text, textHover } = this.labelTheme()
    return ['block mb-1 text-base font-medium transition-colors', text, textHover].join(' ')
  })

  inputClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.inputTheme()
    return ['w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none transition border', bg, bgHover, text, textHover, border].join(' ')
  })

  private onChange: (v: any) => void = () => {}
  private onTouched: () => void = () => {}

  writeValue(v: any): void { this.value = v ?? '' }
  registerOnChange(fn: any): void { this.onChange = fn }
  registerOnTouched(fn: any): void { this.onTouched = fn }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled }

  onInput(v: string): void { this.value = v; this.onChange(v) }
  onBlur(): void { this.onTouched() }

  protected readonly HTMLInputElement = HTMLInputElement;
}
