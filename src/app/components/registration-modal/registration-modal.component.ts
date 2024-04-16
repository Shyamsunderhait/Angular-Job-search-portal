import {
  Component,
  ElementRef,
  Inject,
  Renderer2,
  VERSION,
  ViewChild,
  inject,
} from '@angular/core';
import { FormService } from '../../form.service';

import { CommonService } from '../../common.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Fruit } from '../../fruit';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {
  MatChipInputEvent,
  MatChipEditedEvent,
  MatChip,
  MatChipsModule,
} from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatOption } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-registration-modal',
  standalone: true,
  imports: [
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatSliderModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    MatChip,
    ReactiveFormsModule,
    FormsModule,
    MatOption,
    HttpClientModule,
  ],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.css',
})
export class RegistrationModalComponent {
  [x: string]: any;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;

  users: any;
  urlink: string = 'assets/avatar.png/';
  //states based on country
  countries = [
    'India',
    'United States of America',
    'France',
    'China',
    'Brazil',
    'Germany',
    'Russia',
    'Canada',
    'Australia',
  ]; // Sample countries data
  states: { [key: string]: string[] } = {
    India: [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
    ],
    'United States of America': [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ],
    Canada: [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Nova Scotia',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Northwest Territories',
      'Nunavut',
      'Yukon',
    ],
    Australia: [
      'New South Wales',
      'Victoria',
      'Queensland',
      'Western Australia',
      'South Australia',
      'Tasmania',
      'Australian Capital Territory',
      'Northern Territory',
    ],
    Brazil: [
      'Acre',
      'Alagoas',
      'Amapá',
      'Amazonas',
      'Bahia',
      'Ceará',
      'Espírito Santo',
      'Goiás',
      'Maranhão',
      'Mato Grosso',
      'Mato Grosso do Sul',
      'Minas Gerais',
      'Pará',
      'Paraíba',
      'Paraná',
      'Pernambuco',
      'Piauí',
      'Rio de Janeiro',
      'Rio Grande do Norte',
      'Rio Grande do Sul',
      'Rondônia',
      'Roraima',
      'Santa Catarina',
      'São Paulo',
      'Sergipe',
      'Tocantins',
    ],
    China: [
      'Anhui',
      'Fujian',
      'Gansu',
      'Guangdong',
      'Guizhou',
      'Hainan',
      'Hebei',
      'Heilongjiang',
      'Henan',
      'Hubei',
      'Hunan',
      'Jiangsu',
      'Jiangxi',
      'Jilin',
      'Liaoning',
      'Qinghai',
      'Shaanxi',
      'Shandong',
      'Shanxi',
      'Sichuan',
      'Yunnan',
      'Zhejiang',
      'Taiwan', // Considered as a part of China
      'Hong Kong', // Special Administrative Region of China
      'Macau', // Special Administrative Region of China
    ],
    Russia: [
      'Central Federal District',
      'Southern Federal District',
      'Northwestern Federal District',
      'Far Eastern Federal District',
      'Siberian Federal District',
      'Ural Federal District',
      'Volga Federal District',
    ],
    Germany: [
      'Baden-Württemberg',
      'Bavaria',
      'Berlin',
      'Brandenburg',
      'Bremen',
      'Hamburg',
      'Hesse',
      'Lower Saxony',
      'Mecklenburg-Vorpommern',
      'North Rhine-Westphalia',
      'Rhineland-Palatinate',
      'Saarland',
      'Saxony',
      'Saxony-Anhalt',
      'Schleswig-Holstein',
      'Thuringia',
    ],
    France: [
      'Auvergne-Rhône-Alpes',
      'Bourgogne-Franche-Comté',
      'Brittany',
      'Centre-Val de Loire',
      'Corsica',
      'Grand Est',
      'Hauts-de-France',
      'Île-de-France',
      'Normandy',
      'Nouvelle-Aquitaine',
      'Occitanie',
      'Pays de la Loire',
      "Provence-Alpes-Côte d'Azur",
    ],
  };
  // Submitting the form code

  constructor(
    private fb: FormBuilder,
    private service: CommonService,
    private router: Router,
    public regForm: FormService,
    public renderer: Renderer2,
    public el: ElementRef,
    private dialogRef: MatDialogRef<RegistrationModalComponent>
  ) {
    //changes input fields of address according to type given
    this.regForm.registrationForm
      .get('addressType')
      .valueChanges.subscribe((addressType: any) => {
        if (addressType === 'home') {
          this.regForm.registrationForm.get('companyAddress1').disable();
          this.regForm.registrationForm.get('companyAddress2').disable();
          this.regForm.registrationForm.get('address1').enable();
          this.regForm.registrationForm.get('address2').enable();
        } else if (addressType === 'company') {
          this.regForm.registrationForm.get('companyAddress1').enable();
          this.regForm.registrationForm.get('companyAddress2').enable();
          this.regForm.registrationForm.get('address1').disable();
          this.regForm.registrationForm.get('address2').disable();
        }
      });
  }

  get country() {
    return this.regForm.registrationForm.get('country');
  }

  get state() {
    return this.regForm.registrationForm.get('state');
  }
  onCountryChange() {
    // Reset state value when country changes
    this.state?.setValue('');
  }

  ngOnInit(): void {
    // this.regForm.registrationForm.patchValue({
    //   profileImage:
    //     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgaWQ9ImF2YXRhciI+PHBhdGggZD0iTTI0IDhjLTQuNDIgMC04IDMuNTgtOCA4IDAgNC40MSAzLjU4IDggOCA4czgtMy41OSA4LThjMC00LjQyLTMuNTgtOC04LTh6bTAgMjBjLTUuMzMgMC0xNiAyLjY3LTE2IDh2NGgzMnYtNGMwLTUuMzMtMTAuNjctOC0xNi04eiI+PC9wYXRoPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoNDh2NDhIMHoiPjwvcGF0aD48L3N2Zz4=',
    // });
  }
  // firstName
  get firstname() {
    return this.regForm.registrationForm.controls['firstname'];
  }

  // Register Method
  registerUser() {
    var type = this.regForm.registrationForm.value.id;
    this.service
      .AddUpdateUser(this.regForm.registrationForm.value)
      .subscribe((data) => {
        this.regForm.registrationForm.reset();
        this.dialogRef.close();
        // console.log(data);
      });
    console.log(this.regForm.registrationForm.valid);
    // Add dismiss attribute after a delay
  }

  // Image to base64

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.validateImageSize(reader.result);
        this.regForm.registrationForm.patchValue({
          profileImage: reader.result,
        });
        // this.validateImageSize(reader.result);
      }
    };
  }

  //------- image validation------//

  validateImageSize(base64String: string) {
    const img = new Image();
    img.src = base64String;
    img.onload = () => {
      if (img.width === 310 && img.height === 325) {
        this.regForm.registrationForm.get('profileImage').setErrors(null);
      } else {
        this.regForm.registrationForm
          .get('profileImage')
          .setErrors({ invalidImageSize: true });
      }
    };
  }

  //------- Slider Input ---------//

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + '';
    }

    return `${value}`;
  }

  //Close Modal //

  closeModal() {
    const modalDiv = document.getElementById('modal');
    if (modalDiv != null) {
      modalDiv.style.zIndex = '1000000';
    }
  }

  //-------- Tags input --------------//
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{ name: 'Hockey' }];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  userProfilePage() {
    this.router.navigateByUrl('/userProfile');
  }

  //dismiss method
  addDismissAttribute() {
    const buttonElement = this.el.nativeElement.querySelector('.submit');
    if (buttonElement) {
      this.renderer.setAttribute(buttonElement, 'data-dismiss', 'modal');
    }
  }

  // // ---------- Image input ------------//
  imageURL!: string;

  showPreview(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.regForm.registrationForm.patchValue({
        profileImage: file,
      });
      this.regForm.registrationForm
        .get('profileImage')
        .updateValueAndValidity();
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  currentFile?: File;
  message = '';
  preview = '';
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  //disable button if its not valid

  //toast
}
