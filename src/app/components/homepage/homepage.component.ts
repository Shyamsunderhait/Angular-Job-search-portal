import {
  AfterViewInit,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  Renderer2,
  VERSION,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatChip,
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Fruit } from '../../fruit';
import { read } from 'fs';
import { readFile } from 'fs/promises';
import { MatOption } from '@angular/material/core';
import { CommonService } from '../../common.service';
import {
  HttpClient,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import bootstrap from '../../../main.server';
import { FormService } from '../../form.service';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(RegistrationModalComponent, {
      width: '40%', // Set the width of the dialog
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
