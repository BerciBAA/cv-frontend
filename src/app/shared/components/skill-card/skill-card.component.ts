import {Component, computed, inject, Input} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {ThemeService} from '../../../core/services/theme/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-skill-card',
  imports: [
    ButtonComponent,
    NgClass
  ],
  templateUrl: './skill-card.component.html',
  standalone: true,
  styleUrl: './skill-card.component.css'
})
export class SkillCardComponent {

  private themeService = inject(ThemeService);

  private skillCardTheme = this.themeService.componentTheme('skillCard');

  @Input() public name:string ='';
  @Input() public proficiency:number = 0;

  baseClasses = computed(() => {
    const { bg, text, } = this.skillCardTheme();

    return [
      bg,
      text,
    ];
  });
}
