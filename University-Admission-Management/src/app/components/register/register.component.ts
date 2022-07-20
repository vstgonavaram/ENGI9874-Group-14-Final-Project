import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = "";
  successMessage: string = "";
  loading = false;
  hide = true;
  registerForm: FormGroup = new FormGroup({});
  lPImageURL: any;
  registerScreen: boolean = true;
  accountCreationScreen: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }


  generateForm() {
    this.registerForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, this.formService.emailValidator()]],
      'password': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]],
    });
  }

  submitRegister() {
    //this.showAccountCreationScreen();
    //this.showAccountCreationScreen();


    const data = {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      confirmPassword: this.registerForm.controls['confirmPassword'].value,
      firstName: this.registerForm.controls['firstName'].value,
      lastName: this.registerForm.controls['lastName'].value,
    };

    console.log('data', data);

    this.authenticationService.register(data)
      .subscribe( 
        response => {
          // this.otpScreen = false;
          // this.accountCreationScreen = true;
          if (response.status) {
            this.showAccountCreationScreen();
          } else {
            // this.showRegisterScreen();
            this.errorMessage = "Something wrong, please try again later";
          }
        },
        error => {
          this.loading = false;
          this.errorMessage = "Something wrong, please try again later";
        }
      );

  }


  showAccountCreationScreen() {
    this.errorMessage = "";

    this.registerScreen = false;

    this.accountCreationScreen = true;
  }


}
