import { Component } from '@angular/core';
import { CommonService } from '../../common.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { FormService } from '../../form.service';
import { CommonModule, NgIf } from '@angular/common';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  users: any;
  constructor(
    private service: CommonService,
    public regForm: FormService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllUsers();
    this.GetAllUsers();
  }
  GetAllUsers() {
    this.service.GetAllUsers().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Get the last user object from the array
        this.users = data[data.length - 1];
        console.log('Last user:', this.users);
      } else {
        console.log('No users found.');
      }
    });
  }

  GetUserByID(id: any) {
    this.service.GetUserByID(id).subscribe((data) => {
      this.openDialog();

      this.regForm.registrationForm.patchValue({
        profileImage: data.profileImage,
        tags: data.tags,
        addressType: data.addressType,
        companyAddress1: data.companyAddress1,
        companyAddress2: data.companyAddress2,
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNo: data.phoneNo,
        age: data.age,
        country: data.country,
        state: data.state,
        email: data.email,
      });
      this.service.DeleteUserByID(id).subscribe((data) => {
        console.log(data);
      });
    });
  }

  //d27d
  openDialog() {
    const dialogRef = this.dialog.open(RegistrationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.GetAllUsers();
      console.log(`Dialog result: ${result}`);
    });
  }
}
