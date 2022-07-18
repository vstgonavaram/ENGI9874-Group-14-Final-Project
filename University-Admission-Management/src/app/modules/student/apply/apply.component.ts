import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {


  errorMessage: string = "";
  loading = false;
  hide = true;
  applyForm: FormGroup = new FormGroup({});

  programs = [
    {

    },

  ]

  constructor( private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  generateForm(){
    this.applyForm = this.fb.group({
      'program': ['', [Validators.required]],
      'ielts': ['', [Validators.required]]
    })
  }

}
