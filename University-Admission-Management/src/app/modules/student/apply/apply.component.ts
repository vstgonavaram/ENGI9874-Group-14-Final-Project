import { UploadService } from './../../../services/upload.service';
import { ProgramService } from './../../../services/program.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { NotifierService } from 'angular-notifier';
// import { NotifierService } from 'angular-notifier';

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
  
  filteredProgramOptions: any = [];
  selectedProgram: any = null;

  selectedFile: any = null;


  programs: any = []

  constructor( private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private uploadService: UploadService,
    private router: Router,
    private programService: ProgramService,
    private readonly notifier: NotifierService,
  ) { }

  ngOnInit(): void {

    this.loadPrograms();

  }

  loadPrograms() {

    this.programService.GetPrograms().subscribe((programs: any) => {      
      this.programs = programs;
    });
  }

  onFileSelected(event: any): void {

    console.log('event', event);
    this.selectedFile = event.target.files[0] ?? null;

}

  initializeForm(){
  this.selectedProgram = null;
  this.selectedFile = null;
  }

  applyForUniversity(){

    console.log('selectedFile', this.selectedFile);
    if(this.selectedFile != null || this.selectedProgram != null){
     
      const data = {
        userId: 123,
        programId: 21,
        selectedFile: this.selectedFile,
        status: 'Submitted',
      }

      // this.uploadService.uploadFile();





      // this.programService.ApplyForProgram(data).subscribe((response: any) => {      
        
      //   console.log('response', response);

      //   if(response.status){
      //    this.notifier.notify('success', "Application Submitted Successfully.");

      //     console.log('Application Submitted Successfully')
      //     this.initializeForm();
      //   }

      // });
    }
  }

}
