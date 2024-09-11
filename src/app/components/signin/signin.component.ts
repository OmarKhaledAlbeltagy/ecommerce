import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorsComponent } from "../../shared/ui/validation-errors/validation-errors.component";
import { signupValidation } from '../../shared/validators/register.validators';
import { confirmPasswordValidation } from '../../shared/utilities/confirm-password.utility';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ValidationErrorsComponent, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  isButtonSubmit = false;
  errorMessage:string = "";

  loginForm = this._FormBuilder.group({
    email:[null,signupValidation.email],
    password:[null,signupValidation.password]
  });


validStatus(controlName: string): string {
  const control = this.loginForm.get(controlName);
  return !control?.pristine && control?.valid ? 'is-valid' : !control?.pristine && control?.invalid ? 'is-invalid' : ""
}

sendData() {
  if (this.loginForm.valid) {
    this.isButtonSubmit = true;
    this._AuthService.signin(this.loginForm.value).subscribe({
      next: (res) => { 
        this.isButtonSubmit = false;
        if (res.message == "success") {
          localStorage.setItem('token', res.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
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
