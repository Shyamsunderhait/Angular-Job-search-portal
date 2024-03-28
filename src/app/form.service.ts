import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  registrationForm: any;
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      profileImage: [''],
      firstname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
          Validators.maxLength(20),
        ],
      ],
      lastname: [],
      email: ['', Validators.required],
      phoneNo: [''],
      age: [''],
      addressType: ['home', Validators.required], // Default to 'home' address type
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      companyAddress1: ['', Validators.required],
      companyAddress2: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      tags: [[], [], [], []],
    });
  }
}
