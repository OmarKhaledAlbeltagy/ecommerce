import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorsComponent } from "../../shared/ui/validation-errors/validation-errors.component";
import { confirmPasswordValidation } from '../../shared/utilities/confirm-password.utility';
import { signupValidation } from '../../shared/validators/register.validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ValidationErrorsComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {



  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, signupValidation.name),
    email: new FormControl(null, signupValidation.email),
    password: new FormControl(null, signupValidation.password),
    rePassword: new FormControl(null)
  }, confirmPasswordValidation)


  validStatus(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control?.pristine) {
      if (control?.valid) {
        return 'valid';
      }
      else {
        return 'invalid'
      }
    }
    else {
      return 'nottouched'
    }
  }





  sendData() {
    console.log(this.registerForm);
  }

}
