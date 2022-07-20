import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'src/app/services/form.service';

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
    private formService: FormService,) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.programForm = this.formBuilder.group({
      'programCode': ['', [Validators.required]],
      'programName': ['', [Validators.required]],
      'durationInMonths': ['', [Validators.required]],
    });
  }

  addNewProgram(){
    const data = {
      programCode: this.programForm.controls['programCode'].value,
      programName: this.programForm.controls['programName'].value,
      durationInMonths: this.programForm.controls['durationInMonths'].value,
    };

    console.log('data', data);

    this.programs.push(data);

    this.modalService.dismissAll();

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
