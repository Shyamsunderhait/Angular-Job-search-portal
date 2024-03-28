import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'regModal', component: RegistrationModalComponent },
];
