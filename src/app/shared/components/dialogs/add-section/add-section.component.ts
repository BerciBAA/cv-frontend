import {Component, computed, HostBinding, inject, signal} from '@angular/core';
import {AddSectionCardComponent} from '../../add-section-card/add-section-card.component';
import { DialogRef } from '@angular/cdk/dialog';
import {HtmlEditorComponent} from '../html-editor/html-editor.component';
import {ThemeService} from '../../../../core/services/theme/theme.service';
import {NgClass} from '@angular/common';
import {SkillsComponent} from '../skills/skills.component';
import {CareerHighlightComponent} from '../career-highlight/career-highlight.component';
import {PdfComponent} from '../pdf/pdf.component';
import {CodeComponent} from '../code/code.component';
import {ProjectsComponent} from '../projects/projects.component';
import {State} from './enums/state.enum';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-add-section',
  imports: [
    AddSectionCardComponent,
    HtmlEditorComponent,
    NgClass,
    SkillsComponent,
    CareerHighlightComponent,
    PdfComponent,
    CodeComponent,
    ProjectsComponent,
    TranslatePipe
  ],
  templateUrl: './add-section.component.html',
  standalone: true,
  styleUrl: './add-section.component.css'
})
export class AddSectionComponent {

  private themeService = inject(ThemeService);

  private componentSelectorTheme = this.themeService.componentTheme('componentSelector');
  private closeButtonTheme = this.themeService.componentTheme('closeButton');

  private ref = inject(DialogRef<AddSectionComponent>);

  protected readonly State = State;
  protected isSelected  = signal<boolean>(false);

  activeKind= signal<State>(State.NO_SELECT);

  select(state: State) {
    this.activeKind.set(state);
    this.isSelected.set(true)
  }

  cancelEditor() {
    this.activeKind.set(State.NO_SELECT);
    this.isSelected.set(false);
  }

  close() { this.ref.close(); }

  baseClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.componentSelectorTheme();
    return [
      bg,
      bgHover,
      text,
      textHover,
      border
    ];
  });

  @HostBinding('class')
  get hostClasses(): string {
    return [
      ...this.baseClasses(),
    ].join(' ');
  }

  closeButtonBaseClasses = computed(() => {
    const { bg, bgHover, text, textHover, border } = this.closeButtonTheme();

    return [
      bg,
      bgHover,
      text,
      textHover,
      border
    ];
  });

}
