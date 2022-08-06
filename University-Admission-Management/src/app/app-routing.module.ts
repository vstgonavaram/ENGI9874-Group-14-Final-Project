import { UniversityModule } from './modules/university/university.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/common/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'app',
    component: ContentComponent,
    children: [
      {
        path: 'student',
        loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'university',
        loadChildren: () => import('./modules/university/university.module').then(m => m.UniversityModule)
      }]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    // component: LoginComponent
   redirectTo: 'login', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
