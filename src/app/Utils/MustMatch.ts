import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
 
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordValidator: true });
          } else {
            matchingControl.setErrors(null);
          }
    }
}
export function validarCedula( numero ){

  return false;
}