import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @ViewChild('addUserPopup', { static: true }) userPopup: any = null;
  userForm: FormGroup = new FormGroup({});

  users: any = [{
    confirmPassword: "Admin123",
  email: "sd@gmail.com",
  firstName: "sai",
  lastName: "g",
  password: "Admin123",
}];

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.userForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, this.formService.emailValidator()]],
      'password': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]],
    });
  }

  addNewUser(){
    const data = {
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
      confirmPassword: this.userForm.controls['confirmPassword'].value,
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
    };

    console.log('data', data);

    this.users.push(data);

    this.modalService.dismissAll();

    this.generateForm();

  }

  removeUser(user: any){
    console.log('user to remove', user);
  }

  openpopup() {
    // this.initializeScope();
 
     this.modalService.open(this.userPopup);
 
   }

}
