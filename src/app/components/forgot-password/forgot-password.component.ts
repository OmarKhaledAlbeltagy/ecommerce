import { Component, inject } from '@angular/core';
import { EmailValidator, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorsComponent } from '../../shared/ui/validation-errors/validation-errors.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { signupValidation } from '../../shared/validators/register.validators';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationErrorsComponent, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  steps: number = 1;
  isButtonSubmit = false;
  errorMessage:string = "";

  forgotForm = this._FormBuilder.group({
    email:[null,signupValidation.email]
  });

  verifyResetCode = this._FormBuilder.group({
    resetCode:[null,[Validators.required,Validators.maxLength(6),Validators.minLength(6)]]
  });

  resetPassword = this._FormBuilder.group({
    email:[null,signupValidation.email],
    newPassword:[null,signupValidation.password]
  });




validStatus(controlName: string): string {
  const control = this.forgotForm.get(controlName);
  return !control?.pristine && control?.valid ? 'is-valid' : !control?.pristine && control?.invalid ? 'is-invalid' : ""
}

submitStepOne(){
  if (this.forgotForm.valid) {
    this.isButtonSubmit = true;
    this._AuthService.forgotPassword(this.forgotForm.value).subscribe({
      next: (res)=>{
        this.steps = 2;
        this.isButtonSubmit = false;
      },
      error:(err)=>{

        
        this.errorMessage = err.error.message;
        this.isButtonSubmit = false;
      }
    })
  }
}

submitStepTwo(){
  if (this.verifyResetCode.valid) {
    this.isButtonSubmit = true;
    this._AuthService.verifyRestCode(this.verifyResetCode.value).subscribe({
      next: (res)=>{
        this.steps = 3;
        this.isButtonSubmit = false;
      },
      error:(err)=>{
        this.errorMessage = err.error.message;
        this.isButtonSubmit = false;
      }
    })
  }
}

submitStepThree(){
  if (this.resetPassword.valid) {
    this.isButtonSubmit = true;
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next: (res)=>{
       localStorage.setItem('token', res.token);
       this._AuthService.saveUserData();
       this._Router.navigate(['/home']);
        this.isButtonSubmit = false;
      },
      error:(err)=>{
        this.errorMessage = err.error.message;
        this.isButtonSubmit = false;
      }
    })
  }
}


}
