import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'src/app/services/form.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-add-programs',
  templateUrl: './add-programs.component.html',
  styleUrls: ['./add-programs.component.scss']
})
export class AddProgramsComponent implements OnInit {

  @ViewChild('addProgramPopup', { static: true }) programPopup: any = null;
  programForm: FormGroup = new FormGroup({});

  programs: any = [];
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private programService: ProgramService,) { }

  ngOnInit(): void {
    this.generateForm();

    this.loadPrograms();
  }

  generateForm() {
    this.programForm = this.formBuilder.group({
      'programCode': ['', [Validators.required]],
      'programName': ['', [Validators.required]],
      'durationInMonths': ['', [Validators.required]],
    });
  }

  loadPrograms() {

    console.log('loading programs');

    this.programService.GetPrograms().subscribe((programs: any) => {  
      console.log('programs got', programs);    
      this.programs = programs;
    });
  }

  addNewProgram(){
    const data = {
      programCode: this.programForm.controls['programCode'].value,
      programName: this.programForm.controls['programName'].value,
      durationInMonths: this.programForm.controls['durationInMonths'].value,
    };

    console.log('data', data);

    // this.programs.push(data);

    // this.modalService.dismissAll();


    this.programService.ApplyForProgram(data).subscribe((response: any) => {  
      console.log('programs added', response);    
      // this.programs = programs;
    });


    this.generateForm();

  }

  removeProgram(program: any){
    console.log('program', program);
  }

  openpopup() {
    // this.initializeScope();
 
     this.modalService.open(this.programPopup);
 
   }


}
