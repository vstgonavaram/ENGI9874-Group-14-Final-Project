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

  config = {
    interfaceWithRoute: true,
    listBackgroundColor: 'rgb(233, 233, 233)',
    //fontColor: 'black',
    backgroundColor: 'rgb(233, 233, 233)',
    selectedListFontColor: '#0d47a1',
    highlightOnSelect: true,
    collapseOnSelect: false,
    rtlLayout: false,
  };
  userDetails: any
  currentUser: any
  selectedTab: any = 0;
  tabsAry: any = [];
  appItems: any;
  userPermission: any;
  // GlobalConstants = GlobalConstants;
  Roles = GlobalConstants.RoleJson;
  constructor(    private router: Router,
    private authService: AuthenticationService,) { }

  ngOnInit(): void {
    this.loadTabs();
  }


  loadTabs(): any {
    // if (this.currentUser.selectedRoleName == this.Roles.univUser) {
      this.appItems = [
        {
          label: 'Help Videos',
          faIcon: 'fas fa-video',
          link: '/v1/preview',
          items: []
        },
        {
          label: 'Dashboard',
          faIcon: 'far fa-chart-bar',
          link: '/v1/dashboard',
          items: []
        }
      ];
    // }

    // if (this.currentUser.selectedRoleName == this.Roles.student) {
    //   this.appItems = [
    //     {
    //       label: 'Help Videos',
    //       faIcon: 'fas fa-video',
    //       link: '/v1/preview',
    //       items: []
    //     },
    //     {
    //       label: 'Dashboard',
    //       faIcon: 'far fa-chart-bar',
    //       link: '/v1/dashboard',
    //       items: []
    //     },
    //     {
    //       label: 'Data Collection',
    //       faIcon: 'far fa-list-alt',
    //       items: [
    //         {
    //           label: 'NAAC Data',
    //           faIcon: 'fab fa-wpforms',
    //           link: '/v1/qif-data/data',
    //           items: []
    //         },
    //         {
    //           label: 'My Downloads',
    //           faIcon: 'fa fa-download',
    //           link: '/v1/downloads',
    //           items: []
    //         }

    //       ]
    //     }
    //   ];
    // }

    // if (this.currentUser.selectedRoleName == this.Roles.superAdmin) {
    //   this.appItems = [
    //     {
    //       label: 'Help Videos',
    //       faIcon: 'fas fa-video',
    //       link: '/v1/preview',
    //       items: [],
    //       classname: 'help-videos',
    //     },
    //     {
    //       label: 'Dashboard',
    //       faIcon: 'far fa-chart-bar',
    //       link: '/v1/dashboard',
    //       items: []
    //     },
    //     {
    //       label: 'Data Collection',
    //       faIcon: 'far fa-list-alt',
    //       items: [
    //         {
    //           label: 'NAAC Data',
    //           faIcon: 'fab fa-wpforms',
    //           link: '/v1/qif-data/data',
    //           items: []
    //         },
    //         {
    //           label: 'My Downloads',
    //           faIcon: 'fa fa-download',
    //           link: '/v1/downloads',
    //           items: []
    //         }
    //       ]
    //     }
        
    //   ];
    // }


  }

  loadTabsSuperAdmin(): any {
    if (this.currentUser.selectedRoleName == this.Roles.superAdmin) {
      this.appItems = [
        {
          label: 'Admin',
          faIcon: 'far fa-list-alt',
          link: '/v1/admin',
          items: []
        }
      ];
    }
  }

  tabSelected(selectedTabIndex: number) {
    this.selectedTab = selectedTabIndex;
    var selectedTabObj = this.tabsAry.filter((tab: { id: any; }) => tab.id === selectedTabIndex);
    if (selectedTabIndex == 0 && this.authService.isSuperAdmin() == true) {
      this.router.navigate(['/v1/admin']);
    } else {
      this.router.navigate([selectedTabObj[0].route]);
    }
  }

}
