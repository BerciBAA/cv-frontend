import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  standalone: true,
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent implements OnInit {
  languages = ['hu', 'en'];
  selectedLang: string | null = 'hu';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.selectedLang =
      this.translate.getCurrentLang() || this.translate.getFallbackLang();
  }

  changeLang(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
  }
}
