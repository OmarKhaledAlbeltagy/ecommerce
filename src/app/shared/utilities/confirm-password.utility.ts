import { AbstractControl } from "@angular/forms";

export function confirmPasswordValidation(g: AbstractControl) {
  g.get('password')?.value == g.get('rePassword')?.value ? g.get('rePassword')?.setErrors(null) : g.get('rePassword')?.setErrors({mismatch: true});
  return g.get('password')?.value == g.get('rePassword')?.value ? null : {mismatch: true};
  }