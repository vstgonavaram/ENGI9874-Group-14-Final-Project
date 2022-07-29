import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/constants/global-constants';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-content-menu',
  templateUrl: './content-menu.component.html',
  styleUrls: ['./content-menu.component.scss']
})
export class ContentMenuComponent implements OnInit {

  userDetails: any
  appItems: any;

  // GlobalConstants = GlobalConstants;
  Roles = GlobalConstants.RoleJson;
  constructor(    private router: Router,
    private authService: AuthenticationService,) { }

  ngOnInit(): void {
    this.userDetails =  this.authService.getUserData();
    console.log('userdetails content menu',  this.userDetails);
    this.loadTabs();
  }

  loadTabs(): any {
    if (this.userDetails.role == this.Roles.student) {
      this.appItems = [
        {
          label: 'Applications',
          faIcon: 'apps',
          link: '/app/student/applications',
          items: []
        },
        {
          label: 'Apply',
          faIcon: 'school',
          link: '/app/student/apply',
          items: []
        },
        {
          label: 'Profle',
          faIcon: 'person',
          link: '/app/student/profile',
          items: []
        }
      ];
    }

    if (this.userDetails.role == this.Roles.univUser) {
      this.appItems = [
        {
          label: 'Applications',
          faIcon: 'apps',
          link: '/app/university/applications',
          items: []
        },
        {
          label: 'Profle',
          faIcon: 'person',
          link: '/app/university/profile',
          items: []
        }
      ];
    }

    if (this.userDetails.role == this.Roles.univAdmin) {
      this.appItems = [
        {
          label: 'Admin Settings',
          faIcon: 'school',
          link: '/app/university/admin',
          items: []
        },
        {
          label: 'Applications',
          faIcon: 'apps',
          link: '/app/university/applications',
          items: []
        },
        {
          label: 'Profle',
          faIcon: 'person',
          link: '/app/university/profile',
          items: []
        }
        
      ];
    }

      console.log('app items', this.appItems);
  }


  logOut(){
    this.authService.logout();
  }

}
