import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/components/button/button.component';
import { Dialog } from '@angular/cdk/dialog'
import {HomeComponent} from '../home/home.component';
import {AddSectionComponent} from '../../shared/components/dialogs/add-section/add-section.component';
import {DatePickerComponent} from "../../shared/components/date-picker/date-picker.component";
import {DropdownComponent} from '../../shared/components/dropdown/dropdown.component';
import {PageInfoComponent} from '../../shared/components/page-info/page-info.component';

@Component({
  selector: 'app-hr',
  imports: [
    ButtonComponent,
    DatePickerComponent,
    DropdownComponent,
    PageInfoComponent
  ],
  templateUrl: './hr.component.html',
  standalone: true,
  styleUrl: './hr.component.css'
})
export class HrComponent {

  private dialog = inject(Dialog)
  protected openDialog(){
    this.dialog.open(AddSectionComponent, {
      width: '70%',
      height: '80%',
    });
  }

  private dialog2 = inject(Dialog)
  protected openDialog2(){
    this.dialog.open(PageInfoComponent, {
      width: '70%',
      height: '80%',
    });
  }
}
