import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';

import { AuthenticationService } from './services/auth/authentication.service';
import { HttpInterceptorService } from './services/auth/http-interceptor.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './components/register/register.component';
import { PrintErrorComponent } from './components/print-error/print-error.component';
import { ContentComponent } from './components/common/content/content.component';
import { ContentMenuComponent } from './components/common/content-menu/content-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrintErrorComponent,
    ContentComponent,
    ContentMenuComponent,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatGridListModule,
    NgMaterialMultilevelMenuModule,
    MatListModule
  ],
  exports: [
    MatIconModule,

    MatTableModule,
  ],
  providers: [AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ErrorHandlerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
