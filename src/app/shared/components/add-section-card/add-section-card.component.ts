import {Component, computed, inject, Inject, Input} from '@angular/core';
import {ThemeService} from '../../../core/services/theme/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-add-section-card',
  imports: [
    NgClass
  ],
  templateUrl: './add-section-card.component.html',
  standalone: true,
  styleUrl: './add-section-card.component.css'
})
export class AddSectionCardComponent {

  private themeService = inject(ThemeService);

  private cardTheme = this.themeService.componentTheme('card');

  @Input() title:string ='';
  @Input() description:string = '';

  baseClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.cardTheme();

    return [
      bg,
      bgHover,
      text,
      textHover,
      border
    ];
  });

}
