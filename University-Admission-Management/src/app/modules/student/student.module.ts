import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { ApplyComponent } from './apply/apply.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'applications', component: MyApplicationsComponent },
  { path: 'apply', component: ApplyComponent },
  { path: '**', component: MyApplicationsComponent },
];

@NgModule({
  declarations: [MyApplicationsComponent, ApplyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
  ]
})
export class StudentModule { }
