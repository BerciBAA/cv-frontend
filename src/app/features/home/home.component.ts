import {Component, Inject} from '@angular/core';
import {HasRolesDirective} from 'keycloak-angular';
import {NgClass, NgForOf} from '@angular/common';
import {HighlightJsDirective} from 'ngx-highlight-js';
import {Highlight, HighlightAuto} from 'ngx-highlightjs';
import {HighlightLineNumbers} from 'ngx-highlightjs/line-numbers';
import {ButtonComponent} from '../../shared/components/button/button.component';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  repoUrl: string;
}

@Component({
  selector: 'app-home',
  imports: [
    HasRolesDirective,
    NgForOf,
    NgClass,
    HighlightJsDirective,
    HighlightAuto,
    HighlightLineNumbers,
    Highlight,
    ButtonComponent,
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  technologies = [
    { name: 'Angular', proficiency: 90 },
    { name: 'React', proficiency: 20 },
    { name: 'TypeScript', proficiency: 50 },
    { name: 'Tailwind CSS', proficiency: 80 },
    { name: 'HTML & CSS', proficiency: 100 },
    { name: 'Jest & Cypress', proficiency: 75 }
  ];

  projects: Project[] = [
    {
      title: 'Portfolio Weboldal',
      description: 'Saját bemutatkozó oldal Angular + Tailwind kombinációval.',
      imageUrl: 'https://kep.cdn.index.hu/1/0/3655/36557/365574/36557445_8909c294bdf9368dd1640ef42260245e_wm.jpg',
      repoUrl: 'https://github.com/kissjanos/portfolio'
    },
    {
      title: 'Todo App',
      description: 'Egyszerű TODO lista React-ben, drag & drop funkcióval.',
      imageUrl: 'https://kep.cdn.index.hu/1/0/3655/36557/365574/36557445_8909c294bdf9368dd1640ef42260245e_wm.jpg',
      repoUrl: 'https://github.com/kissjanos/todo-app'
    },
    {
      title: 'E-kereskedelmi demo',
      description: 'Demo shop Angular + NgRx + Firebase backenddel.',
      imageUrl: 'https://kep.cdn.index.hu/1/0/3655/36557/365574/36557445_8909c294bdf9368dd1640ef42260245e_wm.jpg',
      repoUrl: 'https://github.com/kissjanos/shop-demo'
    }
  ];

  code = `  public class Main {
    public static void main(String[] args) {
      System.out.println("Hello World");
    }
  }
  `;


}
