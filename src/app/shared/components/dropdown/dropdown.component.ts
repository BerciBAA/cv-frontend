import { Component, Input, computed, inject, model } from '@angular/core';
import {NgClass, NgFor, NgIf} from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme/theme.service';

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
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent<T = string> {
  private themeService = inject(ThemeService);

  value = model<T | ''>('' as any);
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() options: DropdownOption<T>[] = [];
  @Input() id: string = 'custom-dropdown';

  private inputTheme = this.themeService.componentTheme('input');
  private labelTheme = this.themeService.componentTheme('label');

  labelClasses = computed(() => {
    const { text, textHover } = this.labelTheme();
    return [
      'block mb-1 text-base font-medium transition-colors',
      text,
      textHover
    ].join(' ');
  });

  selectClasses = computed(() => {
    const { bg, bgHover, text, textHover } = this.inputTheme();
    return [
      'w-full h-full resize-none border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-black',
      bg,
      bgHover,
      text,
      textHover
    ].join(' ');
  });

  onChange(raw: any) {
    this.value.update(raw);
  }
}
