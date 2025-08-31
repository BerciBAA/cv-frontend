import {Component, computed, Inject, inject} from '@angular/core';
import {DropdownComponent} from '../../shared/components/dropdown/dropdown.component';
import {HasRolesDirective} from 'keycloak-angular';
import {LanguageSwitcherComponent} from '../../shared/components/language-switcher/language-switcher.component';
import {TranslatePipe} from '@ngx-translate/core';
import Keycloak from 'keycloak-js';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {ThemeService} from '../../core/services/theme/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    DropdownComponent,
    HasRolesDirective,
    LanguageSwitcherComponent,
    TranslatePipe,
    RouterLink,
    ButtonComponent,
    NgClass
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private themeService = inject(ThemeService);
  private headerTheme = this.themeService.componentTheme('header');


  toggleMenu: boolean = false;
  toggleThemeMode: boolean = false;
  isAuthenticated: boolean | undefined = false;

  constructor(private keycloak:Keycloak) {
    this.isAuthenticated = keycloak.authenticated;
  }

  login(){
    console.log(this.isAuthenticated);
    this.keycloak.login();
  }

  logout() {
    console.log(this.isAuthenticated);
    this.keycloak.logout();
  }

  toggle() {
    this.toggleMenu = !this.toggleMenu;
    console.log(this.toggleMenu);
  }

  themeMode() {
    if (this.toggleThemeMode) {
      this.themeService.setStyle('light');

    }else{
      this.themeService.setStyle('dark');

    }
    this.toggleThemeMode = !this.toggleThemeMode;
  }

  baseClasses = computed(() => {
    const { bg, bgHover, text, textHover } = this.headerTheme();

    return [
      bg,
      bgHover,
      text,
      textHover,
    ];
  });
}
