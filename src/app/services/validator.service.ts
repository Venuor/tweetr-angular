import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class ValidatorService {

  constructor() { }

  public trimWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const hasTrimmedWhitespace = control.value.trim().length !== control.value.length;
      return hasTrimmedWhitespace ? {'trimmedWhitespace': {value: control.value}} : null;
    };
  }

  public noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const containsWhitespace = /\s/g.test(control.value);
      return containsWhitespace ? {'containsWhitespace': {value: control.value}} : null;
    };
  }

  public matchPassword(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const password = control.get('password').value;
      const passwordConfirm = control.get('passwordConfirm').value;

      const passwordsMatch = password === passwordConfirm;
      return !passwordsMatch ? {'passwordMatch': {value: password + ' ' + passwordConfirm}} : null;
    };
  }
}
