import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from 'src/app/services/applications.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  displayedColumns: string[] = ['programId', 'programName', 'programDuration', 'fileName', 'status'];
  applications: any = [];
  programs: any = [];

  userProfile: any;


  constructor(  private programService: ProgramService,
    private applicationsService: ApplicationsService,
    public authService: AuthenticationService,) { }

  ngOnInit(): void {

    this.userProfile = this.authService.getUserData();

    console.log('userProfile', this.userProfile);

    this.loadPrograms();

    this.loadApplications();

  }

  loadPrograms() {

    this.programService.GetPrograms().subscribe((programs: any) => {      
      this.programs = programs;
    });
  }

  loadApplications(){

    this.applicationsService.GetApplicationsByStudentId(this.userProfile?.id).subscribe((applications: any) => {  
      console.log('applications', applications); 
      
      const applicationsData: { programName: any; programDuration: any; programId: any; }[] = [];

      applications.forEach((application: any) => {
        const program = this.getProgramName(application.programId)

        const data = {
          ...application,
          programName: program.name,
          programDuration: program.durationInMonths,
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

  getApplications() {

  }

}
