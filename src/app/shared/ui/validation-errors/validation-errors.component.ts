import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'validation-errors',
  standalone: true,
  imports: [],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss'
})
export class ValidationErrorsComponent {
 @Input() formName!:FormGroup
 @Input() controlName!:string
}
