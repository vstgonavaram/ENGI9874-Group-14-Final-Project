import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from 'src/app/services/applications.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-univ-applications',
  templateUrl: './univ-applications.component.html',
  styleUrls: ['./univ-applications.component.scss']
})
export class UnivApplicationsComponent implements OnInit {

  applications: any = [];
  programs: any = [];
  constructor(private programService: ProgramService,
    private applicationsService: ApplicationsService,
    public authService: AuthenticationService,
    ) { }

  ngOnInit(): void {

    this.loadPrograms();

    this.loadApplications();
  }

  loadPrograms() {

    console.log('loading programs');

    this.programService.GetPrograms().subscribe((programs: any) => {      
      console.log('programs', programs);
      this.programs = programs;
    });
  }

  loadApplications(){

    this.applicationsService.GetAllApplications().subscribe((applications: any) => {  
      console.log('applications', applications); 
      
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
