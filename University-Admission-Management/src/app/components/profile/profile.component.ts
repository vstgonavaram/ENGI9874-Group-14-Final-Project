import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any = null;
  constructor( public authService: AuthenticationService,) { }

  ngOnInit(): void {
    this.userDetails = this.authService.getLoggedInUser();

  }

}
