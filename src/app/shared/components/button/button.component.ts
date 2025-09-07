import {Component, computed, EventEmitter, inject, input, Input, Output, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {ThemeService} from '../../../core/services/theme/theme.service';


@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  standalone: true,
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  private themeService = inject(ThemeService);

  type = input('button');

  private buttonTheme = this.themeService.componentTheme('button');

  private cssSignal = signal<string>('');
  @Input() set css(value: string) {
    this.cssSignal.set(value ?? '');
  }

  private classSignal = signal<string>('');
  @Input('class') set hostClass(value: string) {
    this.classSignal.set(value?.trim() ?? '');
  }

  baseClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.buttonTheme();

    const css : string = this.cssSignal();
    if (css) {
      return css
        .split(' ');
    }

    const extraClass: string[] = this.classSignal().split(' ')

    return [
      bg,
      bgHover,
      text,
      textHover,
      border,
      ...extraClass
    ];
  });

}
