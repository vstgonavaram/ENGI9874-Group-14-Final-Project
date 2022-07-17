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

    
  }

  processLoginResponse(response: { status: any; }, errorMessage: string) {

    this.loading = false;
    if (response.status) {

      this.onLoginRouting();

      // if (this.authenticationService.isSuperAdmin() == true) {
      //   this.router.navigate(['v1/admin']);
      // }
      // else if (this.authenticationService.isExternal() == true) {
      //   this.router.navigate(['v1/naac-point/external']);
      // }
      // else {
      //   this.router.navigate(['v1']);
      // }
    }
    else {
      this.loginMessage = errorMessage;
    }

  }

  login() {

    this.processLoginResponse({status: true}, "Email or Password is incorrect")

    // this.loading = true;
    // this.authenticationService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
    //   .subscribe(
    //     (        response: any) => {
    //       this.processLoginResponse(response, "Email or Password is incorrect")

    //     },
    //     (        error: any) => {
    //       this.loading = false;
    //       this.loginMessage = "Email or Password is incorrect";
    //     }
    //   );
  }

  onLoginRouting() {

    console.log('navigating to student home');

    this.router.navigate(['app/student']);

    // if (this.authenticationService.isUserLoggedIn()) {
    //   if (this.authenticationService.isSuperAdmin() == true || this.authenticationService.isUnivUser() == true) {
    //     this.router.navigate(['admin']);
    //   }
    //   else if (this.authenticationService.isStudent() == true) {
    //     this.router.navigate(['student/home']);
    //   }
    //   else {
    //     this.router.navigate(['home']);
    //   }
    // }

    
  }

}
