import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }


  numberValidator() {
    return this.customValidator(/^[1-9][0-9]*$/, 'Please enter a valid number');
  }

  yearValidator() {
    return this.customValidator('^[0-9]{4}$', 'Please enter a valid year');
  }

  mobileWithCountryCodeValidator() {
    return this.customValidator('^((\\+[0-9]{2}-?)|0)?[0-9]{10}$', 'Please enter a valid mobile number');
  }

  mobileValidator() {
    return this.customValidator('^[0-9]{10}$', 'Please enter a valid mobile number');
  }

  emailValidator() {
    return this.customValidator('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$', 'Please enter a valid email');
  }

  customValidator(pattern: any, msg: any) {
    return (control: FormControl) => {
      let urlRegEx: RegExp = pattern;
      if (control.value && !String(control.value).match(urlRegEx)) {
        return {
          invalidMsg: msg
        };
      } else {
        return null;
      }
    };
  }
}
