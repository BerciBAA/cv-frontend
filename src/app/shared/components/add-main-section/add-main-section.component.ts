import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageMetaFormValue } from '../page-info/page-info.component';
import { DialogComponent } from '../dialog/dialog.component';
import { InputComponent } from '../input/input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-main-section',
  imports: [
    DialogComponent,
    InputComponent,
    TranslatePipe,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './add-main-section.component.html',
  standalone: true,
  styleUrl: './add-main-section.component.css',
})
export class AddMainSectionComponent {
  private fb = inject(FormBuilder);

  private ref = inject(DialogRef<AddMainSectionComponent>);

  form = this.fb.group({
    title: ['', [Validators.maxLength(64)]],
  });

  close() {
    this.ref.close();
  }

  onSave() {
    console.log(this.form.getRawValue());
  }
}
