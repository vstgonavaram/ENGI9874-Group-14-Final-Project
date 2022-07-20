import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @ViewChild('addUserPopup', { static: true }) userPopup: any = null;

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  openpopup() {
    // this.initializeScope();
 
     this.modalService.open(this.userPopup);
 
   }

}
