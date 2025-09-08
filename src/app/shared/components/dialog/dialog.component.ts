import {Component, input, output} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-dialog',
  imports: [
    TranslatePipe
  ],
  templateUrl: './dialog.component.html',
  standalone: true,
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  title = input('');

  titleKey = input('');

   close = output<void>();
}
