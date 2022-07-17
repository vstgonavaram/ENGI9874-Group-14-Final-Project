import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

const routes: Routes = [
  { path: '**', component: MyApplicationsComponent },
];

@NgModule({
  declarations: [MyApplicationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentModule { }
