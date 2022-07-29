import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginMessage: string = "";
  loading = false;
  hide = true;
  loginForm: FormGroup = new FormGroup({});

  constructor(  private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    })



    this.onLoginRouting();

    
  }

  processLoginResponse(response: any, errorMessage: string) {

    this.loading = false;
    if (response.email) {

      this.onLoginRouting();

      // this.authenticationService.afterLogin(response)

      // if (this.authenticationService.isUnivAdmin() == true) {
      //   this.router.navigate(['app/university/admin']);
      // }
      // else if(this.authenticationService.isUnivUser() == true){
      //   this.router.navigate(['app/university/applications']);
      // }
      // else if (this.authenticationService.isStudent() == true) {
      //   this.router.navigate(['app/student/applications']);
      // }
    }
    else {
      this.loginMessage = errorMessage;
    }

  }

  login() {


    // let loginData = {
    //   status : true,
    //   data: {
    //     user: {
    //       email: 'sai@gmail.com',
    //       firstName: 'sai theja',
    //       lastName: 'Gonavaram',
    //       role: 1,
    //       id: 6,
    //     },
    //   }
    // }

    // this.processLoginResponse(loginData, "Email or Password is incorrect")

    this.loading = true;
    this.authenticationService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .subscribe(
        (        response: any) => {

          console.log('response', response);

          this.processLoginResponse(response, "Email or Password is incorrect")

        },
        (        error: any) => {
          this.loading = false;
          this.loginMessage = "Email or Password is incorrect";
        }
      );
  }

  onLoginRouting() {

    console.log('navigating to student home', this.authenticationService.isUserLoggedIn());

    if (this.authenticationService.isUserLoggedIn()) {
    //   console.log('')
      if (this.authenticationService.isUnivAdmin() == true) {
        this.router.navigate(['app/university/admin']);
      }
      else if(this.authenticationService.isUnivUser() == true){
        this.router.navigate(['app/university/applications']);
      }
      else if (this.authenticationService.isStudent() == true) {
        this.router.navigate(['app/student/applications']);
      }
    }

    // if(mock){
    //   console.log('mock navigating')
    //   this.router.navigate(['app/university/admin']);
    // }


    
  }

}
