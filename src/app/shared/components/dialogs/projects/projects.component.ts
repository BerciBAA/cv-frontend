import {Component, inject, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TextareaComponent} from '../../textarea/textarea.component';
import {InputComponent} from '../../input/input.component';
import {ButtonComponent} from '../../button/button.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ImageUploaderComponent} from '../../image-uploader/image-uploader.component';


@Component({
  selector: 'app-projects',
  imports: [
    TextareaComponent,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    DecimalPipe,
    FormsModule,
    TranslatePipe,
    ImageUploaderComponent
  ],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  private fb = inject(FormBuilder)

  form = this.fb.group({
    title: ['', [Validators.maxLength(64)]],
    githubLink: ['', [Validators.maxLength(128)]],
    projectLink: ['', [Validators.maxLength(128)]],
    description: ['', [Validators.maxLength(16384)]],
    file: this.fb.control<File[] | null>(null),
  });

  cancel = output<void>();

  onFiles(files: File[]) {
    this.form.get('file')?.setValue(files);
  }

  onSave() {
    console.log(this.form.getRawValue())
  }

  onCancel() {
    this.cancel.emit();
  }
}
