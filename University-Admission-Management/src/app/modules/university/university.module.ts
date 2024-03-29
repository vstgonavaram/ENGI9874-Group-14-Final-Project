import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from 'src/app/components/common/content/content.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { UnivApplicationsComponent } from './univ-applications/univ-applications.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { AddProgramsComponent } from './add-programs/add-programs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from 'src/app/services/auth/http-interceptor.service';
import { ProgramService } from 'src/app/services/program.service';


const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'applications', component: UnivApplicationsComponent },
  { path: '**', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  declarations: [AdminComponent, UnivApplicationsComponent, AddUsersComponent, AddProgramsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [ProgramService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },]
})
export class UniversityModule { }
