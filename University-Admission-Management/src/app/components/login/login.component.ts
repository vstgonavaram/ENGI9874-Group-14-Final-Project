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



    this.onLoginRouting(false);

    
  }

  processLoginResponse(response: { status: any; data: any; }, errorMessage: string) {

    this.loading = false;
    if (response.status) {

      this.onLoginRouting(true);

      this.authenticationService.afterLogin(response)

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


    let loginData = {
      status : true,
      data: {
        user: {
          email: 'saiteja@gmail.com',
          firstName: 'sai theja',
          lastName: 'Gonavaram',
          role: 'UNIVERSITYADMIN',
          id: 12,
        },
        token: ''
      }
    }

    this.processLoginResponse(loginData, "Email or Password is incorrect")

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

  onLoginRouting(mock: boolean) {

    console.log('navigating to student home', this.authenticationService.isUserLoggedIn());

    if (this.authenticationService.isUserLoggedIn()) {
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

    if(mock){
      console.log('mock navigating')
      this.router.navigate(['app/university/admin']);
    }


    
  }

}
