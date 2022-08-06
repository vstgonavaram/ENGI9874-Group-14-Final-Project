import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationsService } from 'src/app/services/applications.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ProgramService } from 'src/app/services/program.service';
import {   DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-univ-applications',
  templateUrl: './univ-applications.component.html',
  styleUrls: ['./univ-applications.component.scss']
})
export class UnivApplicationsComponent implements OnInit {

  @ViewChild('reviewApplicationPopup', { static: true }) reviewPopup: any = null;

  applications: any = [];
  programs: any = [];

  selectedApplication:  any = null;

  constructor(private programService: ProgramService,
    private applicationsService: ApplicationsService,
    public authService: AuthenticationService,
    private modalService: NgbModal,
    private domSanitizer: DomSanitizer,
    ) { }

  ngOnInit(): void {

    this.loadPrograms();

    this.loadApplications();
  }

  loadPrograms() {

    this.programService.GetPrograms().subscribe((programs: any) => {      
      this.programs = programs;
    });
  }

  updateApplication(applicationId: any, applicationStatus: any){

    this.applicationsService.updateApplicationStatus(applicationId,applicationStatus).subscribe((response: any) => {      
      if(response.status){
        this.loadApplications();
      }
    });
  }


  loadApplications(){

    this.applicationsService.GetAllApplications().subscribe((applications: any) => {  
      console.log('applications in univ applications', applications); 
      
      const applicationsData: { programName: any; programDuration: any; programId: any; }[] = [];

      applications.forEach((application: any) => {
        const program = this.getProgramName(application.programId)

        const data = {
          ...application,
          programName: program?.name,
          programDuration: program?.durationInMonths,
        }

        applicationsData.push(data);

        console.log('program', program);
      });

      console.log('applicationsData', applicationsData);


      this.applications = applicationsData;
    });
  }

  getProgramName(id: any){
    console.log('program id', id);
    return this.programs.filter((program: any) => program.id === id )[0];
  }

}
