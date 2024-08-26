import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorsComponent } from "../../shared/ui/validation-errors/validation-errors.component";
import { signupValidation } from '../../shared/validators/register.validators';
import { confirmPasswordValidation } from '../../shared/utilities/confirm-password.utility';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ValidationErrorsComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

    private readonly _FormBuilder = inject(FormBuilder);
    private readonly _AuthService = inject(AuthService);
    private readonly _Router = inject(Router);
    isButtonSubmit = false;
    errorMessage:string = "";
    registerForm = this._FormBuilder.group({
      name:[null,signupValidation.name],
      email:[null,signupValidation.email],
      password:[null,signupValidation.password],
      rePassword:[null]
    },{validators: [confirmPasswordValidation]})


  validStatus(controlName: string): string {
    const control = this.registerForm.get(controlName);
    return !control?.pristine && control?.valid ? 'is-valid' : !control?.pristine && control?.invalid ? 'is-invalid' : ""
  }





  sendData() {
    if (this.registerForm.valid) {
      this.isButtonSubmit = true;
      this._AuthService.signup(this.registerForm.value).subscribe({
        next: (res) => { 
          this.isButtonSubmit = false;
          if (res.message == "success") {
            this._Router.navigate(['/signin']);
          }
        },
        error: (error:HttpErrorResponse) => {
          this.isButtonSubmit = false
          this.errorMessage = error.message;
        }
      });
    }
  }

}
