import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  registrationForm: any;
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      profileImage: [null, Validators.required],
      firstname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
          Validators.maxLength(20),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+\d{1,2}\s?)?((\(\d{3}\))|\d{3})[- .]?\d{3}[- .]?\d{4}$/
          ),
        ],
      ],
      age: ['', Validators.required],
      addressType: ['home', Validators.required], // Default to 'home' address type
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      tags: [[], Validators.required],
    });
  }
}
