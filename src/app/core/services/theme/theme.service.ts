import { computed, Injectable, signal, Signal } from '@angular/core';
import { AppTheme } from './interfaces/app-theme.model';
import { STYLES } from './interfaces/styles.model';
import { ComponentThemeConfig } from './interfaces/component-theme.model';

type NormalizedComponentTheme = {
  bg: string;
  bgHover: string;
  text: string;
  textHover: string;
  border: string;
};
type NormalizedAppTheme = { [K in keyof AppTheme]: NormalizedComponentTheme };

function normalizeComponentTheme(
  t: Partial<ComponentThemeConfig> | ComponentThemeConfig,
): NormalizedComponentTheme {
  return {
    bg: t.bg ?? '',
    bgHover: t.bgHover ?? '',
    text: t.text ?? '',
    textHover: t.textHover ?? '',
    border: t.border ?? '',
  };
}

function normalizeTheme(theme: AppTheme): NormalizedAppTheme {
  const out = {} as NormalizedAppTheme;
  for (const k of Object.keys(theme) as (keyof AppTheme)[]) {
    out[k] = normalizeComponentTheme(theme[k]);
  }
  return out;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSignal = signal<NormalizedAppTheme>(
    normalizeTheme(STYLES.light),
  );
  private mode = signal<'light' | 'dark'>('light');

  componentTheme<K extends keyof AppTheme>(
    key: K,
  ): Signal<NormalizedComponentTheme> {
    return computed(() => this.themeSignal()[key]);
  }

  classesFor<K extends keyof AppTheme>(key: K): Signal<string[]> {
    return computed(() => {
      const { bg, bgHover, text, textHover, border } = this.themeSignal()[key];
      return [bg, bgHover, text, textHover, border].filter((s) => s.length > 0);
    });
  }

  setStyle(name: keyof typeof STYLES) {
    this.themeSignal.set(normalizeTheme(STYLES[name]));
    this.mode.set(name);
  }

  isDark = computed(() => this.mode() === 'dark');

  updateTheme(partial: Partial<AppTheme>) {
    this.themeSignal.update((current) => {
      const merged = { ...current } as NormalizedAppTheme;
      for (const k of Object.keys(partial) as (keyof AppTheme)[]) {
        merged[k] = normalizeComponentTheme({ ...current[k], ...partial[k] });
      }
      return merged;
    });
  }

  updateComponentTheme<K extends keyof AppTheme>(
    key: K,
    partial: Partial<AppTheme[K]>,
  ) {
    this.themeSignal.update((current) => ({
      ...current,
      [key]: normalizeComponentTheme({ ...current[key], ...partial }),
    }));
  }
}
