import {Component, computed, DOCUMENT, effect, inject, Renderer2, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {ThemeService} from './core/services/theme/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgClass],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('cv-frontend');

  private theme = inject(ThemeService).componentTheme('body');
  private doc = inject(DOCUMENT);
  private r = inject(Renderer2);
  private prev: string[] = [];

  bodyClasses = computed(() => {
    const { bg, bgHover, text, textHover } = this.theme();
    return [bg, bgHover, text, textHover].filter(Boolean).join(' ').split(/\s+/);
  });

  constructor() {
    effect(() => {
      const next = this.bodyClasses();
      this.prev.forEach(c => this.r.removeClass(this.doc.body, c));
      next.forEach(c => this.r.addClass(this.doc.body, c));
      this.prev = next;
    });
  }
}
